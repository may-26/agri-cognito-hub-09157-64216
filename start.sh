#!/bin/bash

# Carregar nvm
export NVM_DIR="$HOME/.var/app/com.visualstudio.code/config/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Usar a versão LTS do Node
nvm use --lts

# Iniciar o projeto
npm run dev