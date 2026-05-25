# Release 17.3.x (Angular 17)

Guia para publicar novas versões da linha **17.3.x** do `ngx-smz-ui`.

## Branch e tags

| Item | Valor |
|------|-------|
| Branch de release | `Angular-17` |
| Formato da versão | `17.3.x` (ex.: `17.3.5`) |
| Repositório | https://github.com/smarza/ngx-smz-ui |

> **Importante:** sempre trabalhe na branch `Angular-17`. Não faça checkout de uma tag antes de commitar — isso deixa o repositório em *detached HEAD* e o `git push` simples não funciona.

## Checklist antes do release

1. Atualizar a versão em `projects/ngx-smz-ui/package.json`
2. Documentar as mudanças em `CHANGELOG.md` (seção `[17.3.x] - AAAA-MM-DD`)
3. Revisar e testar localmente, se necessário

## Passo a passo

### 1. Ir para a branch correta

```powershell
git checkout Angular-17
git pull origin Angular-17
```

### 2. Fazer as alterações e commitar

```powershell
git add .
git commit -m "Update version to 17.3.x, <descrição das mudanças>"
```

### 3. Criar a tag

Substitua `17.3.x` pela versão real (ex.: `17.3.5`):

```powershell
git tag 17.3.x
```

Para recriar uma tag local (se ainda não foi enviada ao GitHub):

```powershell
git tag -d 17.3.x
git tag 17.3.x
```

### 4. Enviar branch e tag para o GitHub

```powershell
git push origin Angular-17
git push origin 17.3.x
```

Ou, em um único comando:

```powershell
git push origin Angular-17 17.3.x
```

### 5. Build e publicação no npm

```powershell
npm run build-prod-lib
cd dist/ngx-smz-ui
npm publish
cd ../..
```

## Verificação

Após o push, confirme no GitHub:

- Branch: https://github.com/smarza/ngx-smz-ui/tree/Angular-17
- Tag: https://github.com/smarza/ngx-smz-ui/releases/tag/17.3.x

Comandos úteis:

```powershell
git status
git log -1 --oneline --decorate
git branch -vv
git ls-remote origin refs/tags/17.3.x
```

## Erros comuns

### `fatal: You are not currently on a branch`

Você está em *detached HEAD* (provavelmente fez checkout de uma tag). Corrija assim:

```powershell
git checkout -B Angular-17
git push -u origin Angular-17
```

### Tag enviada, mas commit não aparece na branch

A tag aponta para o commit, mas a branch remota pode estar desatualizada. Envie a branch:

```powershell
git checkout Angular-17
git push origin Angular-17
```

### Tag já existe no remoto

Se precisar mover a tag (somente se a versão ainda não foi publicada no npm):

```powershell
git tag -f 17.3.x
git push origin 17.3.x --force
```

Use `--force` em tags com cuidado — evite se a versão já estiver no npm.

## Exemplo completo (17.3.5)

```powershell
git checkout Angular-17
git pull origin Angular-17

# ... alterações em package.json, CHANGELOG.md, código ...

git add .
git commit -m "Update version to 17.3.5, <descrição das mudanças>"
git tag 17.3.5
git push origin Angular-17 17.3.5

npm run build-prod-lib
cd dist/ngx-smz-ui
npm publish
```
