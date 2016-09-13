<?php

namespace FormaLibre\RestBundle\Manager;

interface ManagerInterface
{
    /**
     * @param $id
     * @return mixed
     */
    public function get($id);

    /**
     * @param $limit
     * @param $offset
     * @return mixed
     */
    public function all($limit, $offset);

    /**
     * @param array $parameters
     * @return mixed
     */
    public function post(array $parameters, array $options);

    /**
     * @param ServerInterface $serverInterface
     * @param array           $parameters
     * @return mixed
     */
    public function put($resource, array $parameters, array $options);

    /**
     * @param ServerInterface $serverInterface
     * @param array           $parameters
     * @return mixed
     */
    public function patch($resource, array $parameters, array $options);

    /**
     * @param ServerInterface $serverInterface
     * @return mixed
     */
    public function delete($resource);
}
