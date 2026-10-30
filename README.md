# ai-template

AIペアプログラミング（Antigravity, Cursor, Claude Code, Copilot 等）を活用した、モダンで安全なフルスタック（Python + TypeScript）開発用スターターテンプレートです。

## 主な特徴

- **技術スタックの対称性（Symmetry）**: Python側（`uv` / `Ruff` / `Pyright` / `Pytest`）とフロントエンド側（`Vite` / `Biome` / `tsc` / `Vitest` / `Playwright`）で、Rust製の高速ツール・厳格な型安全性・ピンポイント単体テストに統一された開発体験を提供。
- **自動化ガードレール**: エディタ保存時に Ruff（Python）と Biome（TypeScript/HTML/CSS）が自動整形・リント修正。コミット時に Git pre-commit フックで型チェックと単体テストを約1〜2秒で自動検証。重いブラウザテスト（Playwright E2E）は CI で並列実行。
- **完全分離型レイアウト**: `src/`（Python）と `frontend/`（Vite + TypeScript）が独立しており、フルスタック開発はもちろん、`frontend/` を除外すれば Python 単体プロジェクトとしてもそのまま機能。
- **コンテキスト節約**: AI自身に無駄な全体テスト・リントコマンドを実行させず、高速かつ低コストで実装を進めるための行動規範（`AGENTS.md`）を整備。

## 技術スタック一覧

| レイヤー | Backend (Python) | Frontend (Web / TypeScript) | 共通の設計思想 |
| :--- | :--- | :--- | :--- |
| **言語仕様** | Python 3.11+ (型ヒント必須) | TypeScript 5+ (Strict) + HTML5 + CSS | 完全な型安全性（AIの幻覚・型崩れを根絶） |
| **パッケージ管理** | `uv` (Rust製・超高速) | `npm` (Node.js標準) | 依存関係の確定（`uv.lock` / `package-lock.json`） |
| **リント & 整形** | `ruff` (Rust製・超高速) | `biome` (Rust製・超高速) | 1ツールでリント＋保存時フォーマット完結 |
| **型チェック** | `pyright` (静的型検査) | `tsc --noEmit` (型定義検証) | pre-commit / CI での型エラー即時検知 |
| **単体テスト** | `pytest` (ピンポイント実行) | `vitest` (Viteネイティブ・ピンポイント) | TDDワークフロー対応（Red-Green-Refactor） |
| **E2E / 統合** | — | `playwright` (ブラウザ自動テスト) | CI および必要時のUI描画保証 |
| **ビルド / サーバー** | Python組み込み | `vite` (HMR開発サーバー / 最適化ビルド) | 業界標準のモダンフロントエンド環境 |

## クイックスタート（新規プロジェクト開始時）

GitHub の「Use this template」からリポジトリを作成後、以下を実行して開発を開始します。

### 1. 前提ツール

- Python 3.11+ & [uv](https://github.com/astral-sh/uv)
- Node.js 20+ (npm 同梱) ※フロントエンドを使用する場合
- Git

### 2. 環境の初期化

```bash
# 1. バックエンド依存関係のインストール（仮想環境 .venv の自動作成、パッケージのeditable登録）
uv sync

# 2. フロントエンド依存関係のインストール（フロントエンドを使用する場合）
cd frontend && npm install && cd ..

# 3. 環境変数ファイルの準備
cp .env.example .env

# 4. Git フックの有効化（コミット前チェックの自動化）
git config core.hooksPath .githooks

# 5. 開発用ブランチの作成
git switch -c feat/initial-setup
```

### 3. パッケージ名のリネーム（任意）

デフォルトの Python パッケージ名 `app` を変更する場合（例: `my_package`）：
1. ディレクトリを変更: `mv src/app src/my_package`
2. `pyproject.toml` の `name = "..."` をプロジェクト名に合わせて更新
3. `pyproject.toml` の `[tool.hatch.build.targets.wheel]` の `packages = ["..."]` を更新
4. `tests/test_smoke.py` のインポート文を `from my_package.main import main` に更新
5. `uv sync` を再実行して仮想環境のeditableリンクを更新

### 4. 実行確認

```bash
# バックエンド（Python）の実行
uv run python -m app.main

# フロントエンド開発サーバーの起動（http://localhost:5173）
npm --prefix frontend run dev

# フロントエンド単体テスト（Vitest）の実行
npm --prefix frontend run test

# フロントエンド E2E テスト（Playwright）の実行（初回のみ npx playwright install chromium が必要）
npm --prefix frontend run test:e2e
```

> [!TIP]
> **Python 単体プロジェクトとして運用する場合**
> フロントエンドが不要な場合は `frontend/` ディレクトリを除外してください。Git の `pre-commit` フックおよび GitHub Actions CI は `frontend/` の有無を自動検知し、存在しない場合はフロントエンド検証をスキップします。
> また、ビルドシステム不要なスクリプト集やバッチとして扱う場合は、`pyproject.toml` に `[tool.uv] package = false` を設定し、`.env` に `PYTHONPATH=src` を追記してください。

---

## 既存リポジトリへの導入（手動移植ガイド）

既存プロジェクトに本テンプレートの「AIペアプロ環境」を安全に取り入れる場合は、以下の設定を既存環境に合わせて手動でマージしてください。

1. **AI 行動規範**:
   - `AGENTS.md` をプロジェクト直下に配置（プロジェクトの事情に合わせて微調整）。
2. **コミット前自動チェック**:
   - `.githooks/pre-commit`, `.githooks/commit-msg` を配置し、`git config core.hooksPath .githooks` を実行。
   - ※すでにフックツール（Huskyやpre-commit framework等）を使用している場合は、既存フック内にバックエンド検証（`uv run pyright`, `uv run pytest`）およびフロントエンド検証（`npm --prefix frontend run lint`, `typecheck`, `test`）を追記。
   - ※macOS / Linux では `chmod +x .githooks/*` が必要な場合があります。
3. **エディタ保存時自動整形**:
   - `.vscode/settings.json` の Ruff / Biome 関連設定を既存の設定ファイルにマージ。
   - `.vscode/extensions.json` の推奨拡張機能（Ruff, Pylance, Python, Biome, Playwright）をマージ。
4. **AI コンテキスト保護**:
   - `.agentignore` / `.geminiignore` をプロジェクト直下に配置（`.env` や未整理メモの AI 読み込みを遮断）。
