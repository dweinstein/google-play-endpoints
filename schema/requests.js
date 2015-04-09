module.exports = {
  "DetailsRequest": {
    "id": "/request/details",
    "type": "object",
    "required": [ "pkg" ],
    "properties": {
      "pkg": {
        "anyOf": [
          { "$ref": "/type/package" },
          { "$ref": "/type/packageName" },
          { "type": "array", "items": {"$ref": "/type/package"} },
          { "type": "array", "items": {"$ref": "/type/packageName"} }
        ]
      }
    }
  },
  "DownloadInfoRequest": {
    "id": "/request/downloadInfo",
    "type": "object",
    "required": [ "pkg" ],
    "properties": {
      "pkg": {
        "$ref": "/type/packageWithVersion"
      }
    }
  }

};

