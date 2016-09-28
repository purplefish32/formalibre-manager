<?php

namespace FormaLibre\RestBundle\Repository;

/**
 * Interface RepositoryInterface.
 */
interface RepositoryInterface
{
    /**
     * @param   $id
     *
     * @return mixed|null
     */
    public function findOneById($id);
}
