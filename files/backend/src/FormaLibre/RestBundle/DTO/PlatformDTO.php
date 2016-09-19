<?php

namespace FormaLibre\RestBundle\DTO;

use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;

class PlatformDTO implements SymfonyFormDTO
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
    private $subdomain;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $description;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $plan;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $endDate;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $maxUsers;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $maxDiskSpace;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $contactName;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $contactEmail;

    /**
     * @var string
     * @Assert\NotBlank()
     */
    private $contactPhone;

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
            'subdomain' => $this->subdomain,
            'description' => $this->description,
            'plan' => $this->plan,
            'endDate' => $this->endDate
            'maxUsers' => $this->maxUsers
            'maxDiskSpace' => $this->maxDiskSpace
            'contactName' => $this->contactName
            'contactEmail' => $this->contactEmail
            'contactPhone' => $this->contactPhone
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
    public function getSubdomain()
    {
        return $this->subdomain;
    }

    /**
     * @param mixed $subdomain
     * @return $this
     */
    public function setSubdomain($subdomain)
    {
        $this->subdomain = $subdomain;
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
    public function getPlan()
    {
        return $this->plan;
    }

    /**
     * @param mixed $plan
     * @return $this
     */
    public function setPlan($plan)
    {
        $this->plan = $plan;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getEndDate()
    {
        return $this->endDate;
    }

    /**
     * @param mixed $endDate
     * @return $this
     */
    public function setEndDate($endDate)
    {
        $this->endDate = $endDate;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getMaxUsers()
    {
        return $this->maxUsers;
    }

    /**
     * @param mixed $maxUsers
     * @return $this
     */
    public function setMaxUsers($maxUsers)
    {
        $this->maxUsers = $maxUsers;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getMaxDiskSpace()
    {
        return $this->maxDiskSpace;
    }

    /**
     * @param mixed $maxDiskSpace
     * @return $this
     */
    public function setMaxDiskSpace($maxDiskSpace)
    {
        $this->maxDiskSpace = $maxDiskSpace;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getContactName()
    {
        return $this->contactName;
    }

    /**
     * @param mixed $contactName
     * @return $this
     */
    public function setContactName($contactName)
    {
        $this->contactName = $contactName;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getContactEmail()
    {
        return $this->contactEmail;
    }

    /**
     * @param mixed $contactEmail
     * @return $this
     */
    public function setContactEmail($contactEmail)
    {
        $this->contactEmail = $contactEmail;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getContactPhone()
    {
        return $this->contactPhone;
    }

    /**
     * @param mixed $contactPhone
     * @return $this
     */
    public function setContactPhone($contactPhone)
    {
        $this->contactPhone = $contactPhone;
        return $this;
    }
}
