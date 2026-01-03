# 📁 Folder Organizer

Utilitário CLI que organiza automaticamente seus arquivos por categoria, monitorando a pasta Downloads e movendo novos arquivos para subpastas organizadas por tipo de extensão.

## 📋 O que ele faz?

O Folder Organizer monitora continuamente sua pasta Downloads e, sempre que um novo arquivo é adicionado, move automaticamente para a pasta apropriada baseada na extensão do arquivo. Por exemplo:
- PDFs vão para `Downloads/PDF/`
- Imagens vão para `Downloads/Images/`
- Vídeos vão para `Downloads/Video/`
- E muito mais!

## 🔧 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 16 ou superior) - [Baixar aqui](https://nodejs.org/)
- **pnpm** - Gerenciador de pacotes rápido
- **pm2** - Para rodar o projeto automaticamente quando o PC ligar

### Instalando pnpm

Se você ainda não tem o pnpm instalado:

```bash
npm install -g pnpm
```

### Instalando pm2

Para instalar o pm2 globalmente:

```bash
npm install -g pm2
```

## 📥 Instalação do Projeto

1. Clone ou navegue até o diretório do projeto:
```bash
cd /home/felipe/Coding/Personal/folder-organizer
```

2. Instale as dependências:
```bash
pnpm install
```

## 🚀 Uso Manual

### Modo Watch (Monitoramento Contínuo)
Monitora a pasta Downloads e organiza arquivos automaticamente conforme eles são adicionados:
```bash
pnpm watch
```

### Modo Startup (Organização Única)
Organiza todos os arquivos existentes na pasta Downloads de uma só vez:
```bash
pnpm startup
```

### Build
Compila o TypeScript para JavaScript:
```bash
pnpm build
```

## 🤖 Configuração com pm2 (Autostart no Boot)

Para fazer o Folder Organizer rodar **automaticamente quando o PC ligar**, siga estes passos:

### 1. Iniciar o projeto com pm2

No diretório do projeto, execute:
```bash
pm2 start pnpm --name "folder-organizer" -- watch
```

Este comando:
- Inicia o modo watch usando pm2
- Nomeia o processo como "folder-organizer"
- Mantém o processo rodando em background

### 2. Salvar a configuração atual

```bash
pm2 save
```

Isso salva a lista de processos atuais para que o pm2 saiba quais aplicações iniciar no boot.

### 3. Configurar pm2 para iniciar no boot do sistema

```bash
pm2 startup
```

Este comando irá:
- Detectar seu sistema operacional (Linux/systemd)
- Gerar um comando específico para seu sistema
- **IMPORTANTE**: Você precisará copiar e executar o comando que o pm2 mostrar (geralmente começa com `sudo`)

Exemplo de saída:
```
[PM2] You have to run this command as root. Execute the following command:
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u felipe --hp /home/felipe
```

**Copie e execute o comando mostrado pelo pm2.**

### 4. Verificar se está funcionando

Após executar o comando de startup, salve novamente para garantir:
```bash
pm2 save
```

Pronto! Agora o Folder Organizer irá iniciar automaticamente sempre que você ligar o PC.

## 📊 Comandos Úteis do pm2

### Ver status dos processos
```bash
pm2 status
```

### Ver logs em tempo real
```bash
pm2 logs folder-organizer
```

### Parar o processo
```bash
pm2 stop folder-organizer
```

### Reiniciar o processo
```bash
pm2 restart folder-organizer
```

### Remover do autostart
```bash
pm2 delete folder-organizer
pm2 save
```

Para desabilitar completamente o autostart do pm2:
```bash
pm2 unstartup
```

## 📂 Categorias de Arquivos

O Folder Organizer move os arquivos para as seguintes pastas baseado nas extensões:

| Extensões | Pasta de Destino |
|-----------|------------------|
| `.pdf` | `PDF/` |
| `.doc`, `.docx`, `.odt` | `Docs/` |
| `.txt`, `.md`, `.rtf` | `Texts/` |
| `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`, `.bmp`, `.webp`, `.ico` | `Images/` |
| `.mp3`, `.wav`, `.ogg`, `.flac`, `.aac` | `Audio/` |
| `.mp4`, `.mkv`, `.avi`, `.mov`, `.webm`, `.flv`, `.wmv` | `Video/` |
| `.xlsx`, `.xls`, `.csv`, `.ods` | `Sheets/` |
| `.ppt`, `.pptx`, `.odp` | `Slides/` |
| `.zip`, `.rar`, `.7z`, `.tar`, `.gz`, `.bz2` | `Zips/` |
| `.deb`, `.rpm`, `.sh`, `.exe`, `.msi`, `.dmg`, `.apk`, `.appimage` | `Executables/` |
| `.js`, `.ts`, `.py`, `.java`, `.c`, `.cpp`, `.go`, `.rs`, `.rb`, `.php`, `.html`, `.css`, `.json`, `.xml`, `.yaml`, `.yml` | `Code/` |
| `.pem`, `.pfx`, `.p12`, `.crt`, `.cer`, `.key` | `Certificates/` |

## 📁 Estrutura do Projeto

```
folder-organizer/
├── src/
│   ├── index.ts      # Modo watch - monitoramento contínuo
│   └── startup.ts    # Modo startup - organização única
├── dist/             # Código compilado (gerado após build)
├── package.json      # Configurações e dependências
├── tsconfig.json     # Configuração do TypeScript
├── pnpm-lock.yaml    # Lock file do pnpm
└── README.md         # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **TypeScript** - Linguagem de programação
- **Node.js** - Runtime JavaScript
- **Chokidar** - Biblioteca para monitoramento de arquivos
- **pnpm** - Gerenciador de pacotes
- **pm2** - Gerenciador de processos para Node.js

## 🔍 Como funciona?

1. O modo watch utiliza a biblioteca `chokidar` para monitorar a pasta `~/Downloads`
2. Quando um novo arquivo é detectado, o script verifica sua extensão
3. Baseado na extensão, o arquivo é movido para a pasta apropriada
4. As pastas são criadas automaticamente se não existirem
5. O processo roda continuamente em background (quando usando pm2)

## ❓ Solução de Problemas

### O processo não inicia no boot
- Verifique se executou o comando `sudo` fornecido pelo `pm2 startup`
- Confirme que executou `pm2 save` após iniciar o processo
- Verifique o status: `pm2 status`

### Arquivos não estão sendo organizados
- Verifique os logs: `pm2 logs folder-organizer`
- Confirme que o processo está rodando: `pm2 status`
- Verifique as permissões da pasta Downloads

### Como parar temporariamente
```bash
pm2 stop folder-organizer
```

Para iniciar novamente:
```bash
pm2 start folder-organizer
```

## 📝 Licença

Este é um projeto pessoal. Use como quiser!

---

**Feito com ❤️ para manter seus Downloads organizados automaticamente!**
