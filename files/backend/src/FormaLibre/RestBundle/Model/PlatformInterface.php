<?php

namespace FormaLibre\RestBundle\Model;

interface PlatformInterface
{
    /**
     * Returns a Platform's name
     *
     * @return mixed
     */
    public function getName();

    /**
     * Returns a Platform's subdomain
     *
     * @return mixed
     */
    public function getSubdomain();

    /**
     * Returns a Platform's description
     *
     * @return mixed
     */
    public function getDescription();

    /**
     * Returns a Platform's plan
     *
     * @return mixed
     */
    public function getPlan();

    /**
     * Returns a Platform's end date
     *
     * @return mixed
     */
    public function getEndDate();

    /**
     * Returns a Platform's max users
     *
     * @return mixed
     */
    public function getMaxUsers();

    /**
     * Returns a Platform's max disk space
     *
     * @return mixed
     */
    public function getMaxDiskSpace();

    /**
     * Returns a Platform's contact name
     *
     * @return mixed
     */
    public function getContactName();

    /**
     * Returns a Platform's contact email
     *
     * @return mixed
     */
    public function getContactEmail();

    /**
     * Returns a Platform's contact phone
     *
     * @return mixed
     */
    public function getContactPhone();
}
