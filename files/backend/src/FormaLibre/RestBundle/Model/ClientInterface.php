<?php

namespace FormaLibre\RestBundle\Model;

interface ClientInterface
{
    /**
     * Returns a Client's firstname.
     *
     * @return mixed
     */
    public function getFirstname();

    /**
     * Returns a Client's lastname.
     *
     * @return mixed
     */
    public function getLastname();

    /**
     * Returns a Client's organisation.
     *
     * @return mixed
     */
    public function getOrganisation();

    /**
     * Returns a Client's email.
     *
     * @return mixed
     */
    public function getEmail();

    /**
     * Returns a Client's phone.
     *
     * @return mixed
     */
    public function getPhone();

    /**
     * Returns a Client's address.
     *
     * @return mixed
     */
    public function getAddress();
}
