<?php

namespace FormaLibre\RestBundle\Model;

interface ServerInterface
{
    /**
     * Returns a Server's ip
     *
     * @return mixed
     */
    public function getIp();

    /**
     * Returns a Server's name
     *
     * @return mixed
     */
    public function getName();

    /**
     * Returns a Server's description
     *
     * @return mixed
     */
    public function getDescription();

    /**
     * Returns a Server's provider
     *
     * @return mixed
     */
    public function getProvider();

    /**
     * Returns a Server's type
     *
     * @return mixed
     */
    public function getType();
}
