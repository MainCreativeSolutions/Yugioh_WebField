# WORKFLOW FRONT-END - F5 Web Design e Tecnologia Atualizada v1.0.1

#### *Para visualizar melhor este documento, abra-o em modo preview em seu editor de código ou a extensão "Markdown Reader do Google Chrome"*
---

## Começando

Esse workflow visa padronizar as estruturas de todos os projetos futuros na parte de web, para agilizar o processo de estruturação, facilitar na manutenção e integração da equipe em todos os projetos, minimizando possíveis erros na hora de rodar o projeto local.<br>

#### Por que ter uma estrutura padronizada?

Manter uma estrutura padronizada, facilita a transição de um projeto para outro entre os membros da equipe, além de agilizar e facilitar o processo de entendimento do projeto.

### Pré-requisitos

* Node.js: ^v8.9.4;
* Npm: ^v5.6.0;
* Grunt.

---
### **Porque usar esse workflow?**
Além de seguirmos um padrão para todos os projetos, trabalhamos nesse workflow para facilitar algumas atividades.

* Estrutura de pastas padronizadas com base no **[Guide Style do SASS](https://sass-guidelin.es/#architecture)**;
* Compilação otimizada de **SASS**;
* Criação automátizada de sprites de imagens;
* Controle de **Packages** com **NPM**;
* Utilização de mixins disponíveis no **COMPASS**;
* Utilização de mixins de versionamento de imagens;
* Sincronização do browser com **[BrowserSync](https://browsersync.io/)**, para fazer reload na página a cada modificação de css, imagens, js. Podemos sincronizar com smartphones, tablets e outras máquinas sem a necessidade de fazer upload no servidor, minimizando erros e quebras de estrutura em diferentes telas e dispositivos;
* Otimização de imagens utilizando **[TinyPNG](https://tinypng.com/)**, como a maior parte das imagens são incluídas dentro das bibliotecas do sitefinty, poderíamos incluir todas as imagens no projeto e fazer a otimização antes de subir para o sitefinity;
* Configuração de arquivos e bibliotecas de fornecedores (**vendors**) Ex: Bootstrap, MaterializeCSS, Owl-Carousel.
* Estrutura de fácil adaptação para multisites, ou seja, sites distintos que usam uma mesma estrutura de layout.
---
## Utilização do workflow
---

### Primeiros passos
Se está página foi aberta automaticamente após a finalização do "NPM INSTALL", isto significa que tudo ocorreu bem e a estrutura já está pronta para ser usada.

### Estrutura
Tudo que estiver relacionado ao front-end do site deverá estar dentro de (" _src "), com base na estrutura do Guide Style do SASS, teremos a seguinte arquiterura de arquivos:
`````
_src 
    fonts

    html
        index.html

    img
        _sprites
            default.png
        svg

        sprite.png
    js

    scss
        base
            _fonts.scss 
            _reset.scss 
            _utilities.scss

        componenets
            _buttons.scss 
            _carousel.scss
            _dropdown.scss 
            _inputs.scss 
        
        layout
            _footer.scss
            _forms.scss
            _header.scss
            _navigation.scss
        
        pages
            _home.scss
        
        utils
            _functions.scss
            _mixins.scss
            _placeholders.scss 
            _sprites.scss 
            _svg-assets.scss 
            _vars.scss 
            _vendors.scss

`````
Com todos os packages devidamente instalados, o primeiro comando a ser executado é o **grunt**, se estiver tudo funcionando corretamente, ele abrirá uma janela no browser de um html já configurado com o **CSS**. Para testar se o **SASS** está sendo compilado corretamente, altere qualquer coisa em ("[_src/scss/base/_utilities.scss](_src/scss/base/_utilities.scss)").

**Exemplo:**
````
body {
    background-color:black;
}
````
### Configurando multisites.
Para configurar essa estrutura para suportar multisites é muito simples, sabendo que o projeto será multisite, isto é sites que compartilham maior parte da estrutura base e podendo evoluir separadamente.


* Abra o arquivo config.json;
* Em multisite: false, altere para true;
* Dentro de ("_src/"), precisamos criar um novo diretório com o nome do site exemplo: "site-1";
* Copie toda a estrutura de ("_src/") para dentro desse novo diretório;
* Crie um novo diretório global e mova a estrutura de ("_src") exceto o diretório do novo site;
* Dentro do diretório do novo site no arquivo main.scss altere o caminho dos "imports" para estrutura global.



### Configurando o server para sincronizar com **BrowserSync** e assistir à todas as alterações de **CSS, JS e IMAGENS**.

* Abra o arquivo [config.json](config.json);
* Na linha onde se encontrar *(**"Server": "",**)* inclua o endereço do projeto ja cadastrado no **IIS** e **hosts**.

````
https://nome-do-projeto.ef5.local/
````

* Execute o comando **grunt**, o **BrowserSync** irá abrir uma janela no navegador com o projeto local e assistindo a quaisquer mudanças feitas em **CSS, JS, IMAGENS** etc.

# Como usar os mixins já definidos?

## EXAMPLOS MIXINS

# Converter unidades de medidas de fontes em *REM*
## parseInt(value)

Remove qualquer unidade do valor, retornando apenas o número inteiro.

Exemplos:
```
@include parseInt(20px) - *20*

@include parseInt(10em) - *10*

@include parseInt(10em) - *10*
```

---

## rem(value)

Converte qualquer valor para *rem*, usando como base a variavel *$font-size*, é importante colocar a variavel *$font-size* na tag *html*.

Exemplos:

**$font-size = 16px**

```
@include parseInt(16px) - *1rem*

@include parseInt(32px) - *2rem*

@include parseInt(24px) - *1.5rem*

@include parseInt(22px) - *1.375rem*

```

---

# Criar ellipsis...

## ellipsis-multiline($line-height, $lines: 2, $set-height: true)

Faz um *ellipsis* de várias linhas, sendo o único parametro obrigatório o line-height.



* *$line-height*: *line-height* desejado  (parâmetro obrigatório);

* *$lines*: Número de linhas (default 2 linhas);

* *$set-height*: True ou false para colocar tamanho fixo ou não (default true).



Exemplos:

````
@include ellipsis-multiline(16px) - Ellipsis com line-height de 16px, 2 linhas e altura fixa

@include ellipsis-multiline(20px, 4) - Ellipsis com line-height de 20px, 4 linhas e altura fixa

@include ellipsis-multiline(24px, 5, false) - Ellipsis com line-height de 25px, 5 linhas e altura automatica
````
---
# Utilizando sprites
## use-sprite($sprite, $width: true)

Seta todas a propriedades usar a sprite de forma correta.
* *$sprite*: Nome da imagem em forma de variável (exemplo.jpg você deve passar $exemplo);

* *$width*: Largura desejada, default é o tamanho real da imagem

Exemplos:

````
@include use-sprite($exemplo): Seta a imagem exemplo com o tamanho real dela

@include use-sprite($exemplo, 50px): Seta a imagem exemplo com o 50px de largura e altura de acordo com a largura
````
---
# Utilizando icones em svg
## svg-icons(map-get($icons, icon-name), color, size)

Após gerar o código svg dos icones e incluí-los em [_src/scss/utils/_svg-assets.scss](_src/scss/utils/_svg-assets.scss), será possível usar esse mixin de forma bem simples.

Estamos desenvolvendo uma biblioteca de icones mais usados nos projetos, com o grunt rodando é possível visualizar a galeria de icones no caminho /icons.html, logo após o número da porta gerada automaticamente do localhost.

Clicando nos icones, você copiará o código abaixo já com a variável do icone.

Exemplo:
````
@include svg-icons(map-get($icons,icon-test), color, size);
````
---
# Utilizando plugin grunt-include-replace
O include grunt replace é uma forma de fazer tipo de page master para conteúdos estáticos que pode conter todo o layout base em um único arquivo e vários outros arquivos separados para cada componente, no final ele gera um arquivo com tudo que você fez include.

Isso é muito útil para ajudar a pensar no projeto como vários componentes e não em páginas.

Para desenvolver uma serie de e-mails que contém vários elementos repetidos etc...

Os arquivos devem estar dentro da pasta [_src/html](_src/html), geralmente criamos uma pasta [_src/html/includes](_src/html/includes) para criar os componentes html.

Exemplo:

```
<div>
    @@include('includes/arquivo.html')
</div>
```
---

### **Metodologia para escrita de CSS**

## Adotaremos a metodologia BEM (Block Element Modifier)
---
Para que o código se torne mais legível, clara e de fácil manutenção.

# BLOCO

O bloco é o recipiente ou contexto em que o elemento se encontra. Imagine isso sendo as grandes partes estruturais do seu código. Você deve ter um cabeçalho, um rodapé, uma barra lateral e uma área para conteúdo. Cada um deles pode ser considerado um bloco.

```
.block
```

# ELEMENTO

O elemento é parte do bloco. O bloco é tudo e os elementos são as partes. Cada elemento é escrito após o nome do bloco, conectado por dois traços sublinhados.

```
.block__element
```
Os dois traços sublinhados permitem que você navegue rápido e visualmente, além de poder manipular o código.


Alguns exemplos de como a metodologia funciona:
````
.header__logo {}
.header__tagline {}
.header__searchbar {}
.header__navigation {}
````
Como pode ver, há bastante espaço para ser criativo e moldar a metodologia ao seu gosto. “Navigation” poderia ser “nav”, “tagline” poderia ser alterada para “tag” ou “tagLine”. A chave é manter a nomenclatura simples, clara e precisa. <br><br>
Não pense demais. E, uma vez que seu HTML e CSS estejam **DRY** (***don’t repeat yourself – não se repita***), não será problema, caso precise alterar os nomes das classes. Se encontrar algum nome mais semântico que funcione para você, apenas tente manter um padrão. Os elementos farão parte da base do nome das classes, ajudando você a entender como estruturar suas folhas de estilo e como administrar seu layout.

### MODIFICADORES
---
Quando você nomeia uma classe, o ponto é permitir que aquele elemento seja repetível, de forma que não precise escrever novas classes em outras áreas do site se os estilos dos elementos são os mesmos. Quando precisar modificar o estilo de um elemento específico, você pode usar um modificado. Para fazer isso, você adiciona um hífen duplo -- após o elemento (ou bloco).


Exemplo simples:
```
.block--modifier {}
.block__element--modifier {}
```
Tenha muito cuidado com estes! Lembre-se de que você vai querer manter o máximo de simplicidade possível para não precisar repetir ou criar classes extras. A menos que, seja extremamente necessário. Falemos sobre o código usando o cabeçalho (header) de um site, como exemplo:

````
.header__navigation {}
.header__navigation--secondary {}
````

Se estiver usando uma navegação secundária, é provável que o espaçamento e o layout sejam os mesmos da navegação primária, mas com a cor diferente. Você pode duplicar os estilos originais ou, melhor ainda, usar @extend, para estender o elemento principal (de forma que o elemento secundário herde todas as propriedades), e assim, mudar só os estilos necessários.<br><br>

````
.header__navigation {
    background: #008cba;
    padding: 1rem 0;
    margin: 2rem 0;
    text-transform: uppercase;
}
 
.header__navigation--secondary {
    @extend .header__navigation;
    background: #dfe0e0;
}
````
Ou usar da seguinte forma:

````
.header__navigation {
    background: #008cba;
    padding: 1rem 0;
    margin: 2rem 0;
    text-transform: uppercase;

    &--secondary {
        background: #dfe0e0;        
    }
}
````

Você talvez esteja pensando: “mas os nomes das classes são tão grandes!”. Eu já vejo assim: A nomenclatura BEM é específica, clara e fácil de ler dentro do HTML e comunica, perfeitamente, seu intuito.<br><br>

Linguagens como o Sass (o Scss, especificamente), nos permite que criemos elementos que compartilhem os mesmos estilos com algumas diferenças. O exemplo acima previne que dupliquemos estilos, porém, permite que alteremos o que for preciso. O interessante da metodologia BEM é que não precisamos combinar nomes de classes ambíguos como “panel panel-default col-md-3”.

## O que não se deve fazer ao utilizar a metodologia **BEM**

Ao utilizar a metodologia BEM, deve-se evitar que reflita o html dentro do css, ou seja, repetir exatamente a estrutura feita no html.

Exemplo de como não se deve fazer o ***HTML*** usando Metodologia ***BEM***:
````
<div class="card">
    <div class="card__header">
        <h2 class="card__header__title">Card's Title</h2>
        <div class="card__header__image">
            <img src="">
        </div>
    </div>
    <div class="card__body">        
        <p class="card__body__subtitle">
            Card's Subtitle 
        </p>
        <p class="card__body__description">
            Card's description
        </p>
    </div>
    <div class="card__footer">
        <a href="#" class="card__footer__link">card's link</a>
    </div>
</div>
````

Exemplo de como não se deve fazer o ***SCSS*** usando Metodologia ***BEM***:

````
.card {
    .card__header {
        .card__header__title {

        }
        .card__header_image {        
        }
    }

    .card__body {
        .card__body__subtitle {

        }
        .card__body__description {

        }
    }

    .card__footer {
        .card__footer__link {

        }
    }

}

````

Exemplo de boas práticas no ***HTML*** usando Metodologia ***BEM***:
````
<div class="card">
    <div class="card__header card__header--bg-dark">
        <h2 class="card__title">Card's Title</h2>
        <div class="card__image">
            <img src="">
        </div>
    </div>
    <div class="card__body">        
        <p class="card__subtitle">
            Card's Subtitle 
        </p>
        <p class="card__description">
            Card' description
        </p>
    </div>
    <div class="card__footer">
        <a href="#" class="card__link">link</a>
    </div>
</div>
````

Exemplo de boas práticas no ***SCSS*** usando Metodologia ***BEM***:

````
.card {  // Bloco
    &__header {  // Elemento 1

        &--bg-dark {  // Modificador do background

        }
        .card__title {

        }
        .card__image {        
        }
    }

    &__body {  // Elemento 2
        .card__subtitle {

        }
        .card__description {

        }
    }

    &__footer {  // Elemento 3
        .card__link {

        }
    }
}

````

### Conclusão

O ***BEM***, em resumo, é isso. Como pode ver, há muito mais coisas a se explorar. ***BEM*** é um sistema em constante evolução que permite você trazer clareza ao seu código, além de ajudá-lo a definir e configurar a hierarquia do seu desenvolvimento front-end.

#### Leitura Complementar

* [Site Oficial da BEM](http://bem.info/)
* [MindBEMding – Entendendo a sintaxe do BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
* [Uma Nova Metodologia para o Front-End: BEM](http://coding.smashingmagazine.com/2012/04/16/a-new-front-end-methodology-bem/)

---
Créditos do texto sobre BEM [TUTPLUS](https://webdesign.tutsplus.com/pt/articles/an-introduction-to-the-bem-methodology--cms-19403).


# Observações gerais e algumas regras que devem ser seguidas:

* Separar devidamente os elementos em arquivos .scss, os estilos referentes a um botão, e devem ficar dentro de /components/_buttons.scss. Utilizar outros arquivos apenas para fazer pequenos ajustes de  posicionamento ou modificação específica e realmente necessária (uma vez que utilizaremos a metodologia ***BEM*** para a escrita de ***SCSS***, e já teríamos nossos modificadores);

* Como na maioria dos projetos fazemos a utilização de algum **framework**, *bootstrap, materialize e angular js*. Todo nome de **class** e **ID** devem ser nomeados em **Inglês**, não deverá portando misturar idiomas para nomear **class** e **ID** por exemplo, ***.box-esquerdo*** e sim ***.box-picture--align-left***, (No exemplo, já uma aplicação de modificador de ***BEM***);

* Antes de fazer commit para enviar para produção, executar o comando ***grunt dist*** para fazer minificação de arquivos e otimização de imagens utilizadas. Ao realizar commit, descrever o que foi feito, e verificar os arquivos que estão na lista do commit. Não fazer commit de coisas que não modificou;

* Sempre trabalhar local nos projetos;

* Ao escrever suas classes css, os comentários são sempre bem-vindos. Nome de classes não devem ser algo genérico do tipo “.box” sem nenhum complemento. Isso vai ajudar em eventuais manutenções, e quando um outro desenvolvedor precisar alterar o código;

* Antes de começar a modificar, sempre fazer update local e verificar se a versão local está de acordo com a versão do servidor;

* Antes de começar a criar componentes novos, verifique se já não há algo parecido ou próximo do que necessita.

#

#### Agradeço a colaboração de todos.