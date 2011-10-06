# redis-chat

...

## Instalation

I always recomend you bundle your dependencies with your application. To do
this, create a `package.json` file in the root of your project with the minimum
information...

    {
      "name": "yourapplication",
      "verson": "0.1.0",
      "dependencies": {
        "redis-authorization": "0.0.0"
      }
    }

Then run the following command using npm...

    npm install

OR, if you just want to start playing with the library run...

    npm install redis-chat

## Docs

    set(resource, user, level, callback)
    remove(resource, user, callback)
    authorzations(resource, callback)
    authorzationsByLevel(resource, callback)
    permissions(user, callback)
    permissionsByLevel(user, callback)

## License

Copyright 2011 Brock Whitten
All rights reserved.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
