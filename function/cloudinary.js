var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dg6efx5de', 
    api_key: '819864134594476', 
    api_secret: 'qDbugZHRw7W_0CX_OCXa8yH9DQI',
    secure: true
  });
module.exports=cloudinary;