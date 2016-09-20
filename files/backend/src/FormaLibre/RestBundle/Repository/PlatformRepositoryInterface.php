<?php

namespace FormaLibre\RestBundle\Repository;

use FormaLibre\RestBundle\Model\PlatformInterface;

/**
 * Interface AccountRepositoryInterface
 * @package FormaLibre\RestBundle\Repository
 */
interface PlatformRepositoryInterface
{
    /**
     * @param PlatformInterface $platform
     * @return mixed
     */
    public function refresh(PlatformInterface $platform);

    /**
     * @param PlatformInterface       $platform
     * @param array                 $arguments
     */
    public function save(PlatformInterface $platform, array $arguments = []);

    /**
     * @param PlatformInterface       $platform
     * @param array                 $arguments
     */
    public function delete(PlatformInterface $platform, array $arguments = []);

    /**
     * @param                       $id
     * @return                      mixed|null
     */
    public function findOneById($id);
}
