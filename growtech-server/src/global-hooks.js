// const answerFormatter = async context => {
//   if (!context.params.provider) return;

//   let erro = context.type == "error";

//   context.result = {
//     msg: erro ? context.error.message : "Sucesso!",
//     erro,
//     resultado: context.result
//   };
// };

// module.exports = {
//   after: {
//     all: answerFormatter
//   },
//   error: {
//     all: answerFormatter
//   }
// };

module.exports = {};
