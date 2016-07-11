<?php
class PlatformEntity
{
    protected $id;
    protected $name;
    protected $subdomain;
    protected $plan;
    /**
     * Accept an array of data matching properties of this class
     * and create the class
     *
     * @param array $data The data to use to create
     */
    public function __construct(array $data) {
        // no id if we're creating
        if(isset($data['id'])) {
            $this->id = $data['id'];
        }
        $this->name = $data['name'];
        $this->subdomain = $data['subdomain'];
        $this->plan = $data['plan'];
    }

    public function getId() {
        return $this->id;
    }
    public function getName() {
        return $this->name;
    }
    public function getSubdomain() {
        return $this->subdomain;
    }
    public function getPlan() {
        return $this->plan;
    }
}
