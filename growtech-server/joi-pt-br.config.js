"use-strict";
module.exports = {
  root: "valor",

  "any.unknown": '"{{#label}}" não é um atributo válido',
  "any.invalid": '"{{#label}}" possui valor inválido',
  "any.empty": '"{{#label}}" não pode ser vazio',
  "any.required": '"{{#label}}" é obrigatório',
  "any.allowOnly": '"{{#label}}" deve ser um dos tipos válidos {{#valids}}',
  "any.default": '"{{#label}}" falha enquanto executava o metodo padrão',
  "any.failover": '"{{#label}}" falha enquanto executava o metodo failover',

  "alternatives.base":
    '"{{#label}}" não corresponde com nenhum dos tipos permitidos',
  "alternatives.types": '"{{#label}}" deve ser um dos tipos válidos {{#types}}',
  "alternatives.match":
    '"{{#label}}" não corresponde com nenhum dos tipos permitidos',

  "array.base": '"{{#label}}" deve ser um array',
  "array.includes":
    '"{{#label}}" não corresponde com nenhum dos tipos permitidos',
  "array.includesRequiredUnknowns":
    '"{{#label}}" não contem {{#unknownMisses}} os valores obrigatórios',
  "array.includesRequiredKnowns": '"{{#label}}" não contem {{#knownMisses}}',
  "array.includesRequiredBoth":
    '"{{#label}}" não contem {{#knownMisses}} e {{#unknownMisses}} os outros valores obrigatórios',
  "array.excludes": '"{{#label}}" contem um valor excluído',
  "array.hasKnown":
    '"{{#label}}" não contem pelo menos uma das correspodências obrigatórias para o tipo "{#patternLabel}"',
  "array.hasUnknown":
    '"{{#label}}" deve ter pelo menos uma das correspondências obrigatórias',
  "array.min": '"{{#label}}" deve ter pelo menos {{#limit}} itens',
  "array.max": '"{{#label}}" deve ter pelos menos ou igual {{#limit}} itens',
  "array.length": '"{{#label}}" deve ter {{#limit}} itens',
  "array.orderedLength": '"{{#label}}" deve ter no máximo {{#limit}} itens',
  "array.ref":
    '"{{#label}}" referência "{{#ref}}" não é um valor inteiro positivo',
  "array.sort":
    '"{{#label}}" deve ser organizado {#order} ordenado por {{#by}}',
  "array.sort.mismatching":
    '"{{#label}}" não pode ser ordenado devido aos tipos incompatíveis',
  "array.sort.unsupported":
    '"{{#label}}" não pode ser ordenado devido ao tipo incompatível {#type}',
  "array.sparse": '"{{#label}}" não deve ser um item de matriz esparso',
  "array.unique": '"{{#label}}" contem valores duplicados',

  "boolean.base": '"{{#label}}" deve ser um boolean',

  "binary.base": '"{{#label}}" deve ser um buffer ou uma string',
  "binary.min": '"{{#label}}" deve ter pelo menos {{#limit}} bytes',
  "binary.max": '"{{#label}}" deve ter pelo menos ou igual {{#limit}} bytes',
  "binary.length": '"{{#label}}" deve ter {{#limit}} bytes',
  "binary.ref":
    '"{{#label}}" referência "{{#ref}}" não é um valor inteiro positivo',

  "date.base":
    '"{{#label}}" deve ser um número em milissegundos ou uma data valida',
  "date.strict": '"{{#label}}" deve ser uma data valida',
  "date.min": '"{{#label}}" deve ter pelo menos "{{#limit}}"',
  "date.max": '"{{#label}}" deve ser menor ou igual "{{#limit}}"',
  "date.less": '"{{#label}}" deve ser menor que "{{#limit}}"',
  "date.greater": '"{{#label}}" deve ser maior que "{{#limit}}"',
  "date.isoDate": '"{{#label}}" deve ser uma data valida no padrão ISO 8601',
  "date.timestamp.javascript":
    '"{{#label}}" deve ser um timestamp ou número em milissegundos',
  "date.timestamp.unix":
    '"{{#label}}" deve ser um timestamp ou o número de segundos',
  "date.ref": '"{{#label}}" referência "{{#ref}}" não é uma data',

  "function.base": '"{{#label}}" deve ser uma função',
  "function.arity": '"{{#label}}" necessita de uma aridade de {{#n}}',
  "function.class": '"{{#label}}" deve ser uma classe',
  "function.maxArity":
    '"{{#label}}" deve ter uma aridade menor ou igual a {{#n}}',
  "function.minArity":
    '"{{#label}}" deve ter uma aridade maior ou igual a {{#n}}',

  "lazy.base": "erro de esquema: esquema lento deve ser definido",
  "lazy.schema": "erro de esquema: esquema lento necessita retornar um esquema",

  "object.base": '"{{#label}}" deve ser um objeto',
  "object.allowUnknown": '"{{#label}}" não é um atributo válido',
  "object.and":
    '"{{#label}}" contem {{#presentWithLabels}} sem os pares obrigatórios {{#missingWithLabels}}',
  "object.assert":
    '"{{#label}}" não é valido pois "{{#ref}}" falha na {{#message}}',
  "object.instance": '"{{#label}}" deve ser uma instância de "{{#type}}"',
  "object.length": '"{{#label}}" necesita ter {{#limit}} filhos',
  "object.max": '"{{#label}}" deve ter no máximo {{#limit}} filhos',
  "object.min": '"{{#label}}" deve ter pelo menos {{#limit}} filhos',
  "object.missing":
    '"{{#label}}" deve ter pelo menos um dos {{#peersWithLabels}}',
  "object.nand":
    '"{{#mainWithLabel}}" não deve ter simultâneamente pares com {{#peersWithLabels}}',
  "object.oxor":
    '"{{#label}}" existem conflito entre pares opcionais e exclusivos {{#peersWithLabels}}',
  "object.pattern.match":
    '"{{#label}}" as chaves não correspondem aos requisitos padrões',
  "object.ref":
    '"{{#label}}" referências "{{#ref}}" não é um número inteiro positivo',
  "object.refType": '"{{#label}}" deve ser uma refência do Joi',
  "object.rename.multiple":
    '"{{#label}}" não pode ser renomeado "{{#from}}" pois multiplas renomeações estão desabilitadas e as chaves já estão renomeadas para "{{#to}}"',
  "object.rename.override":
    '"{{#label}}" não pode ser renomeado "{{#from}}" pois a sobreescrita está desabilitada e o objeto "{{#to}}" existe',
  "object.schema":
    '"{{#label}}" deve ser um esquema do Joi com o {{#type}} tipo',
  "object.with":
    '"{{#mainWithLabel}}" faltam pares obrigatórios "{{#peerWithLabel}}"',
  "object.without":
    '"{{#mainWithLabel}}" conflito com pares proíbidos "{{#peerWithLabel}}"',
  "object.xor":
    '"{{#label}}" existe um conflito entre pares exclusivos {{#peersWithLabels}}',

  "number.base": '"{{#label}}" deve ser um número',
  "number.unsafe": '"{{#label}}" deve ser um número seguro',
  "number.min": '"{{#label}}" deve ser maior ou igual que {{#limit}}',
  "number.max": '"{{#label}}" deve ser menor ou igual que {{#limit}}',
  "number.less": '"{{#label}}" deve ser menor que {{#limit}}',
  "number.greater": '"{{#label}}" deve ser maior que {{#limit}}',
  "number.integer": '"{{#label}}" deve ser um inteiro',
  "number.negative": '"{{#label}}" deve ser um número negativo',
  "number.positive": '"{{#label}}" deve ser um número positivo',
  "number.precision":
    '"{{#label}}" não pode ter mais que {{#limit}} casas decimais',
  "number.ref": '"{{#label}}" referência "{{#ref}}" não é um número',
  "number.multiple": '"{{#label}}" deve ser multiplo de {{#multiple}}',
  "number.port": '"{{#label}}" deve ser uma porta valida',

  "string.base": '"{{#label}}" deve ser uma string',
  "string.min": '"{{#label}}" deve ter pelo menos {{#limit}} caracteres',
  "string.max": '"{{#label}}" deve ser menor ou igual a {{#limit}} caracteres',
  "string.length": '"{{#label}}" o tamanho deve ter {{#limit}} caracteres',
  "string.alphanum": '"{{#label}}" deve ter somente caracteres alfanuméricos',
  "string.token":
    '"{{#label}}" deve ter somente caracteres alfanuméricos e sublinhados',
  "string.regex.base":
    '"{{#label}}" com valor "{[.]}" não corresponde ao padrão obrigatório: {{#pattern}}',
  "string.regex.name":
    '"{{#label}}" com valor "{[.]}" não corresponde o padrão {{#name}}',
  "string.regex.invert.base":
    '"{{#label}}" com valor "{[.]}" corresponde ao padrão invertido: {{#pattern}}',
  "string.regex.invert.name":
    '"{{#label}}" com valor "{[.]}" corresponde ao padrão invertido: {{#name}}',
  "string.domain": '"{{#label}}" deve ter um nome de dominio valido',
  "string.email": '"{{#label}}" deve ser um e-mail valido',
  "string.uri": '"{{#label}}" deve ser um uri valido',
  "string.uriRelativeOnly": '"{{#label}}" deve ser uma uri relativo',
  "string.uriCustomScheme":
    '"{{#label}}" deve ser um uri com esquema correspondente ao {{#scheme}} padrão',
  "string.isoDate": '"{{#label}}" deve ser uma data valida no padrão ISO 8601',
  "string.isoDuration":
    '"{{#label}}" deve ser uma duração valida no padrão ISO 8601',
  "string.guid": '"{{#label}}" deve ser um GUID valido',
  "string.hex": '"{{#label}}" deve ter somente caracteres hexadecimais',
  "string.hexAlign":
    '"{{#label}}" representação descodificada hexadecimal deve estar alinhada por byte',
  "string.base64": '"{{#label}}" deve ser uma string valida em base64',
  "string.dataUri": '"{{#label}}" deve ser uma string valida em dataUri',
  "string.hostname": '"{{#label}}" deve ser um nome de host valido',
  "string.normalize":
    '"{{#label}}" deve ser um unicode normalizado no formulário {{#form}}',
  "string.lowercase": '"{{#label}}" deve ser somente letras minúsculas',
  "string.uppercase": '"{{#label}}" deve ser somente letras maiúsculas',
  "string.trim":
    '"{{#label}}" não deve ter caracteres em branco à esquerda ou à direita',
  "string.creditCard": '"{{#label}}" deve ser um cartão de crédito',
  "string.ref": '"{{#label}}" referência "{{#ref}}" não é um número',
  "string.ip":
    '"{{#label}}" deve ser um endereço de ip valido com a {{#cidr}} CIDR',
  "string.ipVersion":
    '"{{#label}}" deve ser um endereço de ip valido de uma das versões {{#version}} com a {{#cidr}} CIDR',

  "symbol.base": '"{{#label}}" deve ser um simbolo',
  "symbol.map": '"{{#label}}" deve ser um dos {{#map}}'
};
