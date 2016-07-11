<?php
class Server
{
    public $id;
    public $ip;
    public $name;
    public $description;
    public $type;
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
        $this->ip = $data['ip'];
        $this->name = $data['name'];
        $this->description = $data['description'];
        $this->type = $data['type'];
    }
}
