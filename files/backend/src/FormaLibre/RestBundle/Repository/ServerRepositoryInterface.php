<?php

namespace FormaLibre\RestBundle\Repository;

use FormaLibre\RestBundle\Model\ServerInterface;

/**
 * Interface AccountRepositoryInterface.
 */
interface ServerRepositoryInterface
{
    /**
     * @param ServerInterface $server
     *
     * @return mixed
     */
    public function refresh(ServerInterface $server);

    /**
     * @param ServerInterface $server
     * @param array           $arguments
     */
    public function save(ServerInterface $server, array $arguments = []);

    /**
     * @param ServerInterface $server
     * @param array           $arguments
     */
    public function delete(ServerInterface $server, array $arguments = []);

    /**
     * @param   $id
     *
     * @return mixed|null
     */
    public function findOneById($id);
}
