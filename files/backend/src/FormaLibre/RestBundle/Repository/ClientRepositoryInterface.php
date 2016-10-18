<?php

namespace FormaLibre\RestBundle\Repository;

use FormaLibre\RestBundle\Model\ClientInterface;

/**
 * Interface AccountRepositoryInterface.
 */
interface ClientRepositoryInterface
{
    /**
     * @param ClientInterface $server
     *
     * @return mixed
     */
    public function refresh(ClientInterface $server);

    /**
     * @param ClientInterface $server
     * @param array           $arguments
     */
    public function save(ClientInterface $server, array $arguments = []);

    /**
     * @param ClientInterface $server
     * @param array           $arguments
     */
    public function delete(ClientInterface $server, array $arguments = []);

    /**
     * @param   $id
     *
     * @return mixed|null
     */
    public function findOneById($id);
}
