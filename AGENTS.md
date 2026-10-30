# AI Template - Agent Rules

## 1. コア設計思想 & 構造
- **Backend (Python)**:
  - Python 3.11+ 準拠。すべての関数・引数・戻り値に型ヒントを明記すること。
  - `src/` 配下にメインパッケージを配置し、ビジネスロジックと外部I/O（CLI/API/DB）を分離する。
  - 依存は外部から内部への一方向とし、dataclass による構造化データで受け渡しを行う。
- **Frontend (Web / TypeScript)**:
  - TypeScript 5+ (Strict) 準拠。すべての関数・引数・戻り値・API通信に明示的な型定義を行い、`any` の使用を禁止する。
  - `frontend/src/` 配下にビジネスロジック（純粋関数・状態管理）とUI描画（DOM操作・コンポーネント）を分離して配置する。
  - バックエンドとフロントエンドは完全分離型レイアウトとし、互いの名前空間を汚染しないこと。

## 2. 開発ワークフロー (TDD)
新機能・修正時はテスト駆動開発を徹底する：
- **Backend (Python)**:
  1. `tests/` に型定義・テストを作成 (Red)
  2. 対象テストのみピンポイント実行 (`uv run pytest tests/test_xxx.py`)
  3. `src/` に最小限の実装を行い Green にする
  4. 必要に応じてリファクタリング
- **Frontend (TypeScript)**:
  1. `frontend/src/` に型定義・単体テストを作成 (Red)
  2. 対象テストのみピンポイント実行 (`npm --prefix frontend run test -- src/xxx.test.ts`)
  3. `frontend/src/` に最小限の実装を行い Green にする
  4. 必要に応じてリファクタリング

## 3. 実行・自動化ポリシー
- 推測で実装せず、必ず関連・定義ファイルを精読（read_file）すること。仕様が曖昧な場合はユーザーに確認する。
- 編集スコープは指示された最小限の差分に限定し、不要な周辺コードのリファクタリングを禁止する。
- 既存のコメント、docstring / JSDoc、エラーハンドリングを勝手に削除・省略しないこと。
- エラー修正の試行は1回まで。連続失敗時は推測でいじらず即停止してユーザーに指示を仰ぐこと。
- 全体テスト・型チェック・フォーマット（Ruff / Pyright / Pytest / Biome / tsc / Vitest / Playwright）はエディタ保存時および Git pre-commit フック・CI で自動実行されるため、AIは原則実行しない（対象単体テストのピンポイント実行のみ許可）。
- 外部パッケージをインストール（`uv add`、`pip install`、`npm install <package>` など）する前にかならずユーザーに指示を仰ぐこと。
- プロジェクト外へのアクセス、およびプロジェクト内ファイルの物理削除・一括削除は禁止する。
- コメントおよび docstring / JSDoc は日本語で書くこと。
- インラインコメントには理由・制約・背景のみ書くこと。コードから自明な処理はコメントしないこと。
- パブリックなモジュール・クラス・関数には必ず Google 形式の docstring（Python）または JSDoc（TypeScript）を記述すること。型ヒントと重複する型情報は省略し、概要・制約・例外を明確にする。
- ただしテストコードへの過剰な docstring / JSDoc は不要。テスト関数名（`test_xxx`）や `describe` / `it` の説明文で意図を表現すること。

## 4. Git 運用
- コミットやプッシュなどの Git 状態変更は、ユーザーから明示的な指示または承認があるまで自律実行してはならない。
- コミット規約（Conventional Commits: `feat|fix|refactor|test|docs|chore|spike: 日本語の要約`）を厳守する。
- フィーチャーブランチ（`feat/*` 等）で作業し、指示があれば `gh pr create` で PR を作成する。
