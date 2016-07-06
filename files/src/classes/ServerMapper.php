<?php

class ServerMapper extends Mapper
{
    public function getServers() {
          $sql = "SELECT s.ip, s.name, s.description, s.type
              from servers s";
          $stmt = $this->db->query($sql);
          $results = [];
          while($row = $stmt->fetch()) {
              $results[] = new Server($row);
          }
          return $results;
    }
}
