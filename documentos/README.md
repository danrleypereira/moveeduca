# Documentos

Documentos institucionais oficiais do Move & Educa, mantidos em LaTeX com exportação para PDF.

## Conteúdo

| Documento | Fonte | PDF |
|-----------|-------|-----|
| Estatuto Social | `Estatuto.tex` | `Estatuto.pdf` |
| Regimento Interno | `Regimento Interno.tex` | `Regimento Interno.pdf` |
| Políticas Institucionais | `Politicas Institucionais.tex` | `Politicas Institucionais.pdf` |
| Política Financeira | `Politica Financeira.tex` | `Politica Financeira.pdf` |
| Termo de Doação | `Termo de Doacao.tex` | `Termo de Doacao.pdf` |
| Termo de Declaração de Conflito de Interesses | `Termo de Declaracao de Conflito de Interesses.tex` | `Termo de Declaracao de Conflito de Interesses.pdf` |

## Edição

1. Edite o arquivo `.tex` correspondente.
2. Compile para PDF (ex.: `pdflatex Estatuto.tex` ou sua toolchain LaTeX preferida).
3. Commit tanto o `.tex` quanto o `.pdf` gerado.

## Integração com o website

O Estatuto é copiado para o build do site antes de `serve`/`build` via `website/scripts/copy-estatuto.js`, permitindo download público na página Institucional.

## Relação com outros módulos

- **Workflows:** processos BPMN em `workflows/processos/` devem refletir regras definidas nestes documentos.
- **Maestro:** execução futura de processos (assembleias, doações, financeiro) depende das regras aqui descritas.
