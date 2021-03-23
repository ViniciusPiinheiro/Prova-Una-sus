# Prova de Desenvolvimento UNASUS

Assim que baixado, é preciso utilizar o comando para instalar as dependências necessárias:
~ npm install

Após isso, usar o comando abaixo para poder iniciar:
~ npm start

O modelo Front-End desenvolvido se trata de uma tela de login e cadastro.
No caso do login, será checado se a senha ou o usuário estao corretos e se os mesmos existem, em cada caso com um alerta de feedback.
Se tudo estiver conforme necessário e o usuário existir, aparecerá um alerta de sucesso
No caso do Cadastro, teremos 4 campos com as devidas condições:

- O nome deve conter pelo menos 3 caracteres e ser composto apenas por letras;
- O email deve estar devidamente formatado;
- A senha deve conter 8 caracteres ou mais, ao menos um caractere especial, uma letra maiúscula e um dígito numérico.;
- Na confirmação da senha, é preciso que a senha seja a mesma

Caso seja encontrado algum erro durante a digitação o usuário receberá o feedback explicando o que falta. Caso esteja tudo certo, aparecerá um alerta dizendo que o cadastro foi realizado.
