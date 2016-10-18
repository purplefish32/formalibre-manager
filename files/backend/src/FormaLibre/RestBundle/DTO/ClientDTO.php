<?php

namespace FormaLibre\RestBundle\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class ClientDTO implements SymfonyFormDTO
{
    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $firstname;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $lastname;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $organisation;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $email;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $phone;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $address;

    public function getDataClass()
    {
        return self::class;
    }

    /**
     * @return string
     */
    public function jsonSerialize()
    {
        return [
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'organisation' => $this->organisation,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
        ];
    }

    /**
     * @return mixed
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * @param mixed $firstname
     *
     * @return $this
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * @param mixed $lastname
     *
     * @return $this
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getOrganisation()
    {
        return $this->organisation;
    }

    /**
     * @param mixed $organisation
     *
     * @return $this
     */
    public function setOrganisation($organisation)
    {
        $this->organisation = $organisation;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     *
     * @return $this
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * @param mixed $phone
     *
     * @return $this
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param mixed $address
     *
     * @return $this
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

}
