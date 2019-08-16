<?php
//objetos de response e request
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
//use Psr\Http\Message\ResponseFactoryInterface as Factory;

//auto load do Slim.. obrigatorio
require '../../vendor/autoload.php';
require 'DaoUser.php';



//esta flag é para desenvolvimento, em produção voce vmai querer deixar todas em false, para que
// nao fique aparecendo erros e avisos aos usuarios finals e para que o tamanho do header nao seja divulgado

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

//dados de conexao do banco de dados
$config['db']['host']   = '127.0.0.1';
$config['db']['user']   = 'suga';
$config['db']['pass']   = 'suga123.';
$config['db']['dbname'] = 'bein';





//$app = new \Slim\App; //use esta linha caso nao precise fas configuracoes
$app = new \Slim\App(['settings' => $config]);

//Container para instanciamento das classes. Todas as classes adicionadas e instanciadas no container
// sao acessiveis atravez de this->
$container = $app->getContainer();

$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO('mysql:host=' . $db['host'] . ';dbname=' . $db['dbname'],
        $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};
$container['avatar_dir'] = '/var/www/rest/src/public/avatarImgs';
$container['banners_dir'] = '/var/www/rest/src/public/bannersImgs';

//Abaixo são as rotas.. para mais info veja documentacao do SLIM..
//É aqui que vem a vantagem do SLIM!!
//GET - OLÁ MUNDO
$app->get('/{name}/', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("OLÁ. \n Voce entrou no WS da SugaTech - Ubuntu Server 18.04 Bionic Beaver. \n 
                                PHP7, Slim Framework, Apache2, Mysql 5.6  -> < $name > \n");
    return $response;
});


//select users test
$app->get('/select/user/all/', function (Request $request, Response $response, array $args) {
    $db = new DaoUser($this->db);

    return $response->withJson($db->consultaTodos());
});


// -lista task user
$app->post('/select/lista/user_id/', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $user_id = $data['user_id'];

    $db = new DaoUser($this->db);
    return $response->withJson($db->consultaLista($user_id));
});

//salva lista user
$app->post('/save/lista_user/', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $user_id = $data['user_id'];
    $lista = $data['lista'];

    $db = new DaoUser($this->db);

    $resp = $db->salvaLista($user_id, $lista);
    return $response->withJson($resp);
});

//cadastra usuario
$app->post('/auth/login/', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $user = [];
    $erro = [];
    // todo Validate campos!!!

    /*
     * - formato do email
     */

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $erro['error'] = "Formato de email invalido";
        return $response->withJson($erro);
    }
//
    $db = new DaoUser($this->db);
//

    $user = $db->login($data['email'], $data['password']);
    return $response->withJson($user);

});


//cadastra usuario
$app->post('/auth/register/', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $user = [];
    $erro = [];
    // todo Validate campos!!!

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $erro['error'] = "Invalid email format!";
        return $response->withJson($erro);
    }
//
    $db = new DaoUser($this->db);
    if ($db->existeEmail($data['email']) > 0){
        $erro['error'] = "Email já existe";
        return $response->withJson($erro);
    }

    $user['email'] = filter_var($data['email'], FILTER_SANITIZE_STRING);
    $user['password'] = filter_var($data['password'], FILTER_SANITIZE_STRING);
    $user['name'] = filter_var($data['name'], FILTER_SANITIZE_STRING);
    return $response->withJson($db->cadastra($user));
});



$app->run();