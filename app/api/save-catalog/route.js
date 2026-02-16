import { NextResponse } from 'next/server';

const GITHUB_REPO = 'chapterclothinco/mitzvah-studio';
const GITHUB_FILE_PATH = 'data/catalog.json';
const GITHUB_API = `https://api.github.com/repos/${GITHUB_REPO}/contents`;

async function githubGet(pat, filePath) {
  const res = await fetch(`${GITHUB_API}/${filePath}`, {
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  if (res.ok) return res.json();
  if (res.status === 404) return null;
  if (res.status === 401 || res.status === 403) {
    throw new Error('GitHub authentication failed. Check the server GITHUB_PAT.');
  }
  throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
}

async function githubPut(pat, filePath, base64Content, message, sha) {
  const body = { message, content: base64Content, branch: 'main' };
  if (sha) body.sha = sha;

  const res = await fetch(`${GITHUB_API}/${filePath}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || `GitHub API error: ${res.status}`);
  }
  return res.json();
}

export async function POST(request) {
  const pat = process.env.GITHUB_PAT;
  if (!pat) {
    return NextResponse.json(
      { error: 'Server is missing GITHUB_PAT environment variable.' },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { products, images } = body;
  if (!Array.isArray(products)) {
    return NextResponse.json({ error: 'products must be an array.' }, { status: 400 });
  }

  try {
    // Upload images first (if any)
    if (images && typeof images === 'object') {
      for (const [productId, img] of Object.entries(images)) {
        if (!img.dataUrl || !img.fileName) continue;

        // Extract base64 data from data URL (remove "data:image/jpeg;base64," prefix)
        const base64Data = img.dataUrl.split(',')[1];
        if (!base64Data) continue;

        const imagePath = `public/images/products/${img.fileName}`;

        // Check if file already exists (to get SHA for update)
        const existing = await githubGet(pat, imagePath);
        const sha = existing ? existing.sha : null;

        await githubPut(
          pat,
          imagePath,
          base64Data,
          `Upload image for ${productId} via admin panel`,
          sha
        );
      }
    }

    // Save catalog.json
    const existing = await githubGet(pat, GITHUB_FILE_PATH);
    const sha = existing ? existing.sha : null;

    const catalogJSON = JSON.stringify(products, null, 2) + '\n';
    const base64Content = Buffer.from(catalogJSON, 'utf-8').toString('base64');

    await githubPut(
      pat,
      GITHUB_FILE_PATH,
      base64Content,
      'Update catalog.json via admin panel',
      sha
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: 'Deploy failed: ' + err.message },
      { status: 500 }
    );
  }
}
