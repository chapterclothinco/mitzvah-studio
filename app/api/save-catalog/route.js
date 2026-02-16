import { NextResponse } from 'next/server';

const GITHUB_REPO = 'chapterclothinco/mitzvah-studio';
const GITHUB_FILE_PATH = 'data/catalog.json';

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

  const { products } = body;
  if (!Array.isArray(products)) {
    return NextResponse.json({ error: 'products must be an array.' }, { status: 400 });
  }

  try {
    // Step 1: Get current file SHA
    const getRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`,
      {
        headers: {
          Authorization: `Bearer ${pat}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    let sha = null;
    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    } else if (getRes.status === 404) {
      sha = null;
    } else if (getRes.status === 401 || getRes.status === 403) {
      return NextResponse.json(
        { error: 'GitHub authentication failed. Check the server GITHUB_PAT.' },
        { status: 401 }
      );
    } else {
      return NextResponse.json(
        { error: `GitHub API error: ${getRes.status} ${getRes.statusText}` },
        { status: 502 }
      );
    }

    // Step 2: Base64-encode the catalog JSON
    const catalogJSON = JSON.stringify(products, null, 2) + '\n';
    const base64Content = Buffer.from(catalogJSON, 'utf-8').toString('base64');

    // Step 3: PUT the updated file
    const putBody = {
      message: 'Update catalog.json via admin panel',
      content: base64Content,
      branch: 'main',
    };
    if (sha) putBody.sha = sha;

    const putRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${pat}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putBody),
      }
    );

    if (!putRes.ok) {
      const errData = await putRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: errData.message || `GitHub API error: ${putRes.status}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: 'Deploy failed: ' + err.message },
      { status: 500 }
    );
  }
}
