Avaliação:
CREATE TABLE `avaliação` (
 `idAvaliação` int NOT NULL,
 `Data` date NOT NULL,
 `Clientes_idClientes` int NOT NULL,
 `Conteúdo_ID_conteúdo` int NOT NULL,
 `Conteúdo_Clientes_idClientes` int NOT NULL,
 `Conteúdo_Categorias_idCategorias` int NOT NULL,
 `Nota` varchar(45) NOT NULL,
 PRIMARY KEY (`idAvaliação`),
 UNIQUE KEY `idAvaliação_UNIQUE` (`idAvaliação`),
 UNIQUE KEY `Nota_UNIQUE` (`Nota`),
 KEY `fk_Avaliação_Clientes1_idx` (`Clientes_idClientes`),
 KEY `fk_Avaliação_Conteúdo1_idx`
(`Conteúdo_ID_conteúdo`,`Conteúdo_Clientes_idClientes`,`Conteúdo_Categori
as_idCategorias`),
 CONSTRAINT `fk_Avaliação_Clientes1` FOREIGN KEY (`Clientes_idClientes`)
REFERENCES `clientes` (`idClientes`),
 CONSTRAINT `fk_Avaliação_Conteúdo1` FOREIGN KEY
(`Conteúdo_ID_conteúdo`, `Conteúdo_Clientes_idClientes`,
`Conteúdo_Categorias_idCategorias`) REFERENCES `conteúdo_postagem`
(`ID_conteúdo`, `Clientes_idClientes`, `Categorias_idCategorias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
banner-carrossel:
CREATE TABLE `banner_carrossel` (
 `idBanner` int NOT NULL,
 `Imagens` varchar(300) NOT NULL,
 `Titulo` varchar(100) NOT NULL,
 `SubTitulo_Descrição` varchar(300) NOT NULL,
 `Links` varchar(100) NOT NULL,
 `nOrdem` varchar(200) NOT NULL,
 PRIMARY KEY (`idBanner`),
 UNIQUE KEY `idBanner_UNIQUE` (`idBanner`),
 UNIQUE KEY `Imagens_UNIQUE` (`Imagens`),
 UNIQUE KEY `Titulo_UNIQUE` (`Titulo`),
 UNIQUE KEY `SubTitulo_UNIQUE` (`SubTitulo_Descrição`),
 UNIQUE KEY `Links_UNIQUE` (`Links`),
 UNIQUE KEY `nOrdem_UNIQUE` (`nOrdem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
campanha:
CREATE TABLE `campanha` (
 `idCampanha` int NOT NULL,
 `Data de Inicio` datetime NOT NULL,
 `Data de Termino` datetime NOT NULL,
 `Nome` varchar(300) NOT NULL,
 `Campanhacol` varchar(45) NOT NULL,
 PRIMARY KEY (`idCampanha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
campanha_has_banner_carrossel:
CREATE TABLE `campanha_has_banner_carrossel` (
 `Campanha_idCampanha` int NOT NULL,
 `Banner_Carrossel_idBanner` int NOT NULL,
 PRIMARY KEY (`Campanha_idCampanha`,`Banner_Carrossel_idBanner`),
 KEY `fk_Campanha_has_Banner_Carrossel_Banner_Carrossel1_idx`
(`Banner_Carrossel_idBanner`),
 KEY `fk_Campanha_has_Banner_Carrossel_Campanha1_idx`
(`Campanha_idCampanha`),
 CONSTRAINT `fk_Campanha_has_Banner_Carrossel_Banner_Carrossel1` FOREIGN
KEY (`Banner_Carrossel_idBanner`) REFERENCES `banner_carrossel`
(`idBanner`),
 CONSTRAINT `fk_Campanha_has_Banner_Carrossel_Campanha1` FOREIGN KEY
(`Campanha_idCampanha`) REFERENCES `campanha` (`idCampanha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
categorias:
CREATE TABLE `categorias` (
 `idCategorias` int NOT NULL,
 `Nome` varchar(45) NOT NULL,
 `Titulo` varchar(100) NOT NULL,
 `Descrição` varchar(300) NOT NULL,
 PRIMARY KEY (`idCategorias`),
 UNIQUE KEY `idCategorias_UNIQUE` (`idCategorias`),
 UNIQUE KEY `Nome_UNIQUE` (`Nome`),
 UNIQUE KEY `Titulo_UNIQUE` (`Titulo`),
 UNIQUE KEY `Descrição_UNIQUE` (`Descrição`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
clientes:
CREATE TABLE `clientes` (
 `idClientes` int NOT NULL AUTO_INCREMENT,
 `Nome` varchar(50) NOT NULL,
 `Nickname` varchar(50) NOT NULL,
 `Perfil` varchar(400) NOT NULL,
 `senha` char(10) NOT NULL,
 `Data de Nascimento` date NOT NULL,
 `E-mail` varchar(80) NOT NULL,
 PRIMARY KEY (`idClientes`),
 UNIQUE KEY `idClientes_UNIQUE` (`idClientes`),
 UNIQUE KEY `Nickname_UNIQUE` (`Nickname`),
 UNIQUE KEY `Perfilk_UNIQUE` (`Perfil`),
 UNIQUE KEY `E-mail_UNIQUE` (`E-mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
comentarios:
CREATE TABLE `comentário` (
 `idComentário` int NOT NULL,
 `Conteúdo_ID_conteúdo` int NOT NULL,
 `Conteúdo_Clientes_idClientes` int NOT NULL,
 `Conteúdo_Categorias_idCategorias` int NOT NULL,
 `Clientes_idClientes` int NOT NULL,
 `Mensagens` text NOT NULL,
 PRIMARY KEY (`idComentário`,`Clientes_idClientes`),
 KEY `fk_Comentário_Conteúdo1_idx`
(`Conteúdo_ID_conteúdo`,`Conteúdo_Clientes_idClientes`,`Conteúdo_Categori
as_idCategorias`),
 KEY `fk_Comentário_Clientes1_idx` (`Clientes_idClientes`),
 CONSTRAINT `fk_Comentário_Clientes1` FOREIGN KEY
(`Clientes_idClientes`) REFERENCES `clientes` (`idClientes`),
 CONSTRAINT `fk_Comentário_Conteúdo1` FOREIGN KEY
(`Conteúdo_ID_conteúdo`, `Conteúdo_Clientes_idClientes`,
`Conteúdo_Categorias_idCategorias`) REFERENCES `conteúdo_postagem`
(`ID_conteúdo`, `Clientes_idClientes`, `Categorias_idCategorias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
conteudo_postagem:
CREATE TABLE `conteúdo_postagem` (
 `ID_conteúdo` int NOT NULL,
 `Clientes_idClientes` int NOT NULL,
 `Categorias_idCategorias` int NOT NULL,
 `Titulo` varchar(100) NOT NULL,
 `tempo` time NOT NULL,
 `quantidade` varchar(15) NOT NULL,
 `Descrição` varchar(300) NOT NULL,
 `Itens Nescessarios` text NOT NULL,
 `Etapas_Modo de Preparo` text NOT NULL,
 PRIMARY KEY
(`ID_conteúdo`,`Clientes_idClientes`,`Categorias_idCategorias`),
 KEY `fk_Conteúdo_Clientes1_idx` (`Clientes_idClientes`),
 KEY `fk_Conteúdo_Categorias1_idx` (`Categorias_idCategorias`),
 CONSTRAINT `fk_Conteúdo_Categorias1` FOREIGN KEY
(`Categorias_idCategorias`) REFERENCES `categorias` (`idCategorias`),
 CONSTRAINT `fk_Conteúdo_Clientes1` FOREIGN KEY (`Clientes_idClientes`)
REFERENCES `clientes` (`idClientes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
favoritos:
CREATE TABLE `favoritos` (
 `iD_Favoritos` int NOT NULL,
 `Clientes_idClientes` int NOT NULL,
 `Conteúdo_ID_conteúdo` int NOT NULL,
 `Conteúdo_Clientes_idClientes` int NOT NULL,
 `Conteúdo_Categorias_idCategorias` int NOT NULL,
 `Data` date NOT NULL,
 PRIMARY KEY
(`iD_Favoritos`,`Clientes_idClientes`,`Conteúdo_ID_conteúdo`,`Conteúdo_Cl
ientes_idClientes`,`Conteúdo_Categorias_idCategorias`),
 UNIQUE KEY `iD_Favoritos_UNIQUE` (`iD_Favoritos`),
 KEY `fk_Clientes_has_Conteúdo_Conteúdo1_idx`
(`Conteúdo_ID_conteúdo`,`Conteúdo_Clientes_idClientes`,`Conteúdo_Categori
as_idCategorias`),
 KEY `fk_Clientes_has_Conteúdo_Clientes1_idx` (`Clientes_idClientes`),
 CONSTRAINT `fk_Clientes_has_Conteúdo_Clientes1` FOREIGN KEY
(`Clientes_idClientes`) REFERENCES `clientes` (`idClientes`),
 CONSTRAINT `fk_Clientes_has_Conteúdo_Conteúdo1` FOREIGN KEY
(`Conteúdo_ID_conteúdo`, `Conteúdo_Clientes_idClientes`,
`Conteúdo_Categorias_idCategorias`) REFERENCES `conteúdo_postagem`
(`ID_conteúdo`, `Clientes_idClientes`, `Categorias_idCategorias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
mídia:
CREATE TABLE `mídia` (
 `idMídia` int NOT NULL,
 `Links` varchar(300) NOT NULL,
 `Imagens` varchar(300) NOT NULL,
 `VIdeos` varchar(300) NOT NULL,
 `Mídiacol` varchar(300) NOT NULL,
 `Conteúdo_Postagem_ID_conteúdo` int NOT NULL,
 `Conteúdo_Postagem_Clientes_idClientes` int NOT NULL,
 `Conteúdo_Postagem_Categorias_idCategorias` int NOT NULL,
 PRIMARY KEY
(`idMídia`,`Conteúdo_Postagem_ID_conteúdo`,`Conteúdo_Postagem_Clientes_id
Clientes`,`Conteúdo_Postagem_Categorias_idCategorias`),
 KEY `fk_Mídia_Conteúdo_Postagem1_idx`
(`Conteúdo_Postagem_ID_conteúdo`,`Conteúdo_Postagem_Clientes_idClientes`,
`Conteúdo_Postagem_Categorias_idCategorias`),
 CONSTRAINT `fk_Mídia_Conteúdo_Postagem1` FOREIGN KEY
(`Conteúdo_Postagem_ID_conteúdo`,
`Conteúdo_Postagem_Clientes_idClientes`,
`Conteúdo_Postagem_Categorias_idCategorias`) REFERENCES
`conteúdo_postagem` (`ID_conteúdo`, `Clientes_idClientes`,
`Categorias_idCategorias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
perguntas:
CREATE TABLE `perguntas` (
 `ID_Pergunta` int NOT NULL,
 `titulo` varchar(100) NOT NULL,
 `Conteudo` varchar(400) NOT NULL,
 `Clientes_idClientes` int NOT NULL,
 PRIMARY KEY (`ID_Pergunta`),
 UNIQUE KEY `ID_Pergunta_UNIQUE` (`ID_Pergunta`),
 UNIQUE KEY `ID_Resposta_UNIQUE` (`titulo`),
 KEY `fk_Perguntas_Clientes1_idx` (`Clientes_idClientes`),
 CONSTRAINT `fk_Perguntas_Clientes1` FOREIGN KEY (`Clientes_idClientes`)
REFERENCES `clientes` (`idClientes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
planos:
CREATE TABLE `planos` (
 `ID_Planos` int NOT NULL,
 `Nome` varchar(100) NOT NULL,
 `Descrição` varchar(300) NOT NULL,
 `Preço` decimal(8,2) NOT NULL,
 PRIMARY KEY (`ID_Planos`),
 UNIQUE KEY `ID_Planos_UNIQUE` (`ID_Planos`),
 UNIQUE KEY `Nome_UNIQUE` (`Nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
planos_has_clientes:
CREATE TABLE `planos_has_clientes` (
 `Planos_ID_Planos` int NOT NULL,
 `Clientes_idClientes` int NOT NULL,
 `Data de Inicip` datetime NOT NULL,
 `Data de Termino` datetime NOT NULL,
 `Data de Pagamento` datetime NOT NULL,
 PRIMARY KEY (`Planos_ID_Planos`,`Clientes_idClientes`),
 KEY `fk_Planos_has_Clientes_Clientes1_idx` (`Clientes_idClientes`),
 KEY `fk_Planos_has_Clientes_Planos1_idx` (`Planos_ID_Planos`),
 CONSTRAINT `fk_Planos_has_Clientes_Clientes1` FOREIGN KEY
(`Clientes_idClientes`) REFERENCES `clientes` (`idClientes`),
 CONSTRAINT `fk_Planos_has_Clientes_Planos1` FOREIGN KEY
(`Planos_ID_Planos`) REFERENCES `planos` (`ID_Planos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
resposta_dica:
CREATE TABLE `respostas_dica` (
 `ID_Respostas` int NOT NULL,
 `Conteúdo` varchar(45) NOT NULL,
 `Perguntas_ID_Pergunta` int NOT NULL,
 `Clientes_idClientes` int NOT NULL,
 PRIMARY KEY (`ID_Respostas`,`Clientes_idClientes`),
 UNIQUE KEY `ID_Respostas_UNIQUE` (`ID_Respostas`),
 KEY `fk_Respostas_Perguntas1_idx` (`Perguntas_ID_Pergunta`),
 KEY `fk_Respostas_Clientes1_idx` (`Clientes_idClientes`),
 CONSTRAINT `fk_Respostas_Clientes1` FOREIGN KEY (`Clientes_idClientes`)
REFERENCES `clientes` (`idClientes`),
 CONSTRAINT `fk_Respostas_Perguntas1` FOREIGN KEY
(`Perguntas_ID_Pergunta`) REFERENCES `perguntas` (`ID_Pergunta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3
temas_tags:
CREATE TABLE `temas_tags` (
 `ID_Temas` int NOT NULL,
 `Conteúdo_ID_conteúdo` int NOT NULL,
 `Conteúdo_Clientes_idClientes` int NOT NULL,
 `Categorias_idCategorias` int NOT NULL,
 `Titulo` varchar(100) NOT NULL,
 `Descrição` varchar(300) DEFAULT NULL,
 PRIMARY KEY
(`ID_Temas`,`Conteúdo_ID_conteúdo`,`Conteúdo_Clientes_idClientes`,`Catego
rias_idCategorias`),
 KEY `fk_Temas_Conteúdo1_idx`
(`Conteúdo_ID_conteúdo`,`Conteúdo_Clientes_idClientes`),
 KEY `fk_Temas_Categorias1_idx` (`Categorias_idCategorias`),
 CONSTRAINT `fk_Temas_Categorias1` FOREIGN KEY
(`Categorias_idCategorias`) REFERENCES `categorias` (`idCategorias`),
 CONSTRAINT `fk_Temas_Conteúdo1` FOREIGN KEY (`Conteúdo_ID_conteúdo`,
`Conteúdo_Clientes_idClientes`) REFERENCES `conteúdo_postagem`
(`ID_conteúdo`, `Clientes_idClientes`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3