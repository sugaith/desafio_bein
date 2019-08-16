<?php
//require_once 'DaoCareer.php';

/**
 * Created by PhpStorm.
 * User: suga
 * Date: 02-Jun-18
 * Time: 1:47 AM
 */
class DaoUser
{
    public $db;
    public $y;
    public $z;                  // the x coordinate of this Point.

    /*
     * use the x and y variables inherited from Point.php.
     */
    public function __construct($db)
    {
        $this->db = $db;
    }

    public function consultaTodos()
    {

        $sth = $this->db->prepare("SELECT * FROM user");
        $sth->execute();
        $todos = $sth->fetchAll();

        return $todos;
    }

    public function consultaLista($user_id)
    {
        $sql = "SELECT * FROM task WHERE user_id = {$user_id}";
        try {
            $sth = $this->db->prepare($sql);
            $sth->execute();
            $result = $sth->fetchAll();

            return $result;
        } catch (PDOException $e) {
            $erro = [];
            $erro['error'] =  $sql . "<br>" . $e->getMessage();
            return $erro;
        }
    }


    public function existeEmail($email)
    {
        $sql = "SELECT count(id) as count FROM user WHERE email LIKE '{$email}'";

        try {
            $sth = $this->db->prepare($sql);
            $sth->execute();
            list($result) = $sth->fetchAll();

            return $result['count'];
        } catch (PDOException $e) {
            $erro = [];
            $erro['error'] = "error";
            $erro['msg'] = $sql . "<br>" . $e->getMessage();
            return $erro;
        }
    }


    public function login($email, $passw)
    {
        $sql = "SELECT * FROM user WHERE email = '{$email}' and senha = '{$passw}'";

        try {
            $sth = $this->db->prepare($sql);
            $sth->execute();
            list($result) = $sth->fetchAll();

            return $result;
        } catch (PDOException $e) {
            $erro = [];
            $erro['error'] = "error";
            $erro['msg'] = $sql . "<br>" . $e->getMessage();
            return $erro;
        }
    }

    public function cadastra(array $user)
    {
        try {
            $sql = "INSERT INTO user (email, senha, nome) VALUES ('{$user['email']}',  '{$user['password']}', '{$user['name']}')";

            $sth = $this->db->prepare($sql);
            $sth->execute();
            $last_id = $this->db->lastInsertId();

            if ($last_id > 0) {
                $sth = $this->db->prepare("SELECT * FROM user WHERE id = " . $last_id);
                $sth->execute();
                list($todos) = $sth->fetchAll();

                return $todos;
            } else {

                $erro = [];
                $erro['error'] = "erro ao insterir";
                return $erro;
            }

            //consulta

            $todos = $sth->fetchAll();

            return $todos;
        } catch (PDOException $e) {
            $erro = [];
            $erro['error'] = $sql . "<br>" . $e->getMessage();
            return $erro;
        }



    }

    public function salvaLista($user_id, $lista)    {
        try {
            $sql = "DELETE FROM task WHERE user_id = " . $user_id;
            $sth = $this->db->prepare($sql);
            $sth->execute();

            foreach ($lista as $task) {
                $check = $task['checked']?1:0;
                $sql = "INSERT INTO task (`desc`, checked, user_id) VALUES ('{$task['desc']}',  {$check}, {$user_id})";

                $sth = $this->db->prepare($sql);
                $sth->execute();
            }

            $ret = "OK";
            return $ret;
        } catch (PDOException $e) {
            $erro = [];
            $erro['error'] = $sql . "<br>" . $e->getMessage();
            return $erro;
        }
    }


}