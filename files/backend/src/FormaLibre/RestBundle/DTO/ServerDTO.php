<?php

namespace FormaLibre\RestBundle\DTO;

use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;

class ServerDTO implements SymfonyFormDTO
{
    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $name;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $ip;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $description;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $provider;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $type;

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
            'name' => $this->name,
            'ip' => $this->ip,
            'description' => $this->description,
            'provider' => $this->provider,
            'type' => $this->type
        ];
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     * @return $this
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getIp()
    {
        return $this->ip;
    }

    /**
     * @param mixed $ip
     * @return $this
     */
    public function setIp($ip)
    {
        $this->ip = $ip;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     * @return $this
     */
    public function setDescription($description)
    {
        $this->description = $description;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getProvider()
    {
        return $this->provider;
    }

    /**
     * @param mixed $provider
     * @return $this
     */
    public function setProvider($provider)
    {
        $this->provider = $provider;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param mixed $type
     * @return $this
     */
    public function setType($type)
    {
        $this->type = $type;
        return $this;
    }
}
