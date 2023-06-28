db.createUser(
   {
      user: 'eldar',
      pwd: 'eldar010596',
      roles: [
         {
            role: 'readWrite',
            db: 'space-app'
         }
      ]
   }
)