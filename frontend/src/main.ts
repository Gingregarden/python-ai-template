/**
 * フロントエンドのエントリーポイントおよび表示ロジックを提供するモジュール。
 */

/**
 * アプリケーションの初期挨拶メッセージを生成する。
 *
 * @param projectName 表示するプロジェクト名（省略時は "ai-template"）
 * @returns 挨拶メッセージ文字列
 */
export function createGreeting(projectName = "ai-template"): string {
  return `Hello from ${projectName}!`;
}

/**
 * 指定されたコンテナ要素へ初期UIを描画する。
 *
 * @param container 描画対象のHTML要素
 */
export function renderApp(container: HTMLElement): void {
  const heading = document.createElement("h1");
  heading.textContent = createGreeting();

  const description = document.createElement("p");
  description.textContent = "Full-stack AI Pair Programming Template (Python + TypeScript)";

  container.replaceChildren(heading, description);
}

// ブラウザ環境で #app 要素が存在する場合のみ自動マウントする
if (typeof document !== "undefined") {
  const root = document.querySelector<HTMLElement>("#app");
  if (root !== null) {
    renderApp(root);
  }
}
