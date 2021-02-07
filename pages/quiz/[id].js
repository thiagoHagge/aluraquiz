/* eslint-disable linebreak-style */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGalera(dbExterno) {
  // const [db, setDb] = React.useState({});

  // React.useEffect(() => {

  // });

  console.log(dbExterno.dbExterno);
  return (
    <ThemeProvider theme={dbExterno.dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.dbExterno.questions}
        externalBg={dbExterno.dbExterno.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');
  const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }
      throw new Error('Falha em pegar dados');
    })
    .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
    .catch((err) => {
      console.log(err);
    });
  console.log(dbExterno);
  return {
    props: {
      dbExterno,
    }, // will be passed to the page component as props
  };
}
