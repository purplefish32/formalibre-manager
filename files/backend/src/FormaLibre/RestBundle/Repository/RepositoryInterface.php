<?php

namespace FormaLibre\RestBundle\Repository;

/**
 * Interface RepositoryInterface
 * @package FormaLibre\RestBundle\Repository
 */
interface RepositoryInterface
{
    /**
     * @param                           $id
     * @return                          mixed|null
     */
    public function findOneById($id);
}
