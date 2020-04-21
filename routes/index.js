const express = require('express');
const router = express.Router();

const htmlHead = `<head>
                        <meta charset=utf-8 />
                        <title>Without Early Flush Example</title>
                        <script>
                            function onJsLoad(type) {
                                alert(type+ ' loaded');
                            }
                        </script>
                        <script onload="onJsLoad('JS')" src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous" async defer></script>
                        <style>
                            .loader,
                            .loader:after {
                                border-radius: 50%;
                                width: 10em;
                                height: 10em;
                            }
                            .loader {
                                color: #2b55ff;
                                margin: 60px auto;
                                font-size: 10px;
                                position: relative;
                                text-indent: -9999em;
                                border-top: 1.1em solid rgba(43,85,255, 0.2);
                                border-right: 1.1em solid rgba(43,85,255, 0.2);
                                border-bottom: 1.1em solid rgba(43,85,255, 0.2);
                                border-left: 1.1em solid #2b55ff;
                                -webkit-transform: translateZ(0);
                                -ms-transform: translateZ(0);
                                transform: translateZ(0);
                                -webkit-animation: load8 1.1s infinite linear;
                                animation: load8 1.1s infinite linear;
                            }
                            @-webkit-keyframes load8 {
                                0% {
                                    -webkit-transform: rotate(0deg);
                                    transform: rotate(0deg);
                                }
                                100% {
                                    -webkit-transform: rotate(360deg);
                                    transform: rotate(360deg);
                                }
                            }
                            @keyframes load8 {
                                0% {
                                    -webkit-transform: rotate(0deg);
                                    transform: rotate(0deg);
                                }
                                100% {
                                    -webkit-transform: rotate(360deg);
                                    transform: rotate(360deg);
                                }
                            }
                        </style>
                  </head>`;

router.get('/with-early-flush', function (req, res) {
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Content-Encoding', 'none');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<!DOCTYPE html>
               <html>
                    ${ htmlHead }
                    <body>
                        <div class="loader">Loading...</div>
                        <link rel="stylesheet" onload="onJsLoad('CSS')" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">`);

    setTimeout(() => {
        res.end(`<script>
                        document.querySelector(".loader").style.display = "none";     
                  </script>
                  <br>
                  <br>
                  <center><h2>Page Rendered</h2></center>
                  </body>
                  </html>`);
    }, 7000);
});

router.get('/without-early-flush', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    setTimeout(() => {
        res.end(`<!DOCTYPE html>
               <html>
                    ${ htmlHead }
                    <body>
                        <div class="loader">Loading...</div>
                        <br>
                        <br>
                        <center><h2 style="display: none">Page Rendered</h2></center>
                        <link rel="stylesheet" onload="onJsLoad('CSS')" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
                        <script>
                            document.querySelector(".loader").style.display = "none";
                            document.addEventListener('load', function() {
                                document.querySelector("h2").style.display = "block";
                            }, true);
                        </script>
                    </body>
               </html>`);
    }, 7000);
});


router.get('/', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html>
               <html>
                    <body>
                        <center>
                            <h1>Welcome to Early Flush Strategy Example</h1>
                            <br><br><br>
                            <h3><a href="/without-early-flush" target="_blank">Click here to see -- <b>Non Early Flush Example</b></a></h3>
                            <h3><a href="/with-early-flush" target="_blank">Click here to see -- <b>Early Flush Example</b></a></h3>
                        </center>
                    </body>
               </html>`);
});
module.exports = router;
