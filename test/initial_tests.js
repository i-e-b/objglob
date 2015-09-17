var expect = require('chai').expect;

var objglob = require("../index.js");

describe("Path manipulation", function() {
    describe("When selecting paths to include", function() {
        it("should include only matched keys", function(){
            var input = {
                "name":"root",
                "link": [
                    {
                        "type":"A",
                        "child": {
                            "name":"a-child",
                            "class":"beta"
                        }
                    },
                    {
                        "type":"B",
                        "child": {
                            "name":"b-child",
                            "class":"beta"
                        }
                    }
                ]
            };

            var patterns = ["**/name"];

            var expected = {
                "name":"root",
                "link": [
                    {
                        "child": {
                            "name":"a-child",
                        }
                    },
                    {
                        "child": {
                            "name":"b-child",
                        }
                    }
                ]
            };

            var result = objglob.filter(patterns, input);

            expect(result).to.deep.equal(expected);
        });
        it("should result in cloned object if all paths are matched and none are rejected",function(){
            var input = {
                "name":"root",
                "link": [
                    {
                        "type":"A",
                        "child": {
                            "name":"a-child",
                            "class":"beta"
                        }
                    },
                    {
                        "type":"B",
                        "child": {
                            "name":"b-child",
                            "class":"beta"
                        }
                    }
                ]
            };

            var patterns = ["**"];
           
            var result = objglob.filter(patterns, input);

            expect(result).to.deep.equal(input);
            expect(result == input).to.be.false;
        });
        it("should return only root level objects with a single star",function(){
            var input = {
                "name":"root",
                "type":"A",
                "child": {
                    "name":"a-child",
                    "class":"beta"
                }
            };

            var patterns = ["*"];

            var expected = {
                "name":"root",
                "type":"A"
            };

            var result = objglob.filter(patterns, input);

            expect(result).to.deep.equal(expected);
        });
        it("should result in undefined if no paths match anywhere",function(){
            var input = {
                "name":"root",
                "link": [
                    {
                        "type":"A",
                        "child": {
                            "name":"a-child",
                            "class":"beta"
                        }
                    },
                    {
                        "type":"B",
                        "child": {
                            "name":"b-child",
                            "class":"beta"
                        }
                    }
                ]
            };

            var patterns = ["aisdeountiso"];
           
            var result = objglob.filter(patterns, input);

            expect(result).to.be.undefined;
        });
        it("should result in undefined if no paths are given",function(){
            var input = {
                "name":"root",
                "link": [
                    {
                        "type":"A",
                        "child": {
                            "name":"a-child",
                            "class":"beta"
                        }
                    },
                    {
                        "type":"B",
                        "child": {
                            "name":"b-child",
                            "class":"beta"
                        }
                    }
                ]
            };

            var patterns = [];
           
            var result = objglob.filter(patterns, input);

            expect(result).to.be.undefined;
        });

    });
    describe("When selecting paths to exclude", function() {
        it("should result in undefined if all paths are rejected",function(){
            var input = {
                "name":"root",
                "link": [
                    {
                        "type":"A",
                        "child": {
                            "name":"a-child",
                            "class":"beta"
                        }
                    },
                    {
                        "type":"B",
                        "child": {
                            "name":"b-child",
                            "class":"beta"
                        }
                    }
                ]
            };

            var patterns = ["!*"];

            var result = objglob.filter(patterns, input);

            expect(result).to.be.undefined;
        });

        it("should remove excluded paths even if they would have child matches", function(){
            var input = {
                "name":"root",
                "_attr": {
                    "id":"x"
                },

                "link": [
                    {
                        "type":"A",
                        "child": {
                            "name":"a-child",
                            "class":"beta"
                        }
                    },
                    {
                        "type":"B",
                        "child": {
                            "_attr": {
                                "id":"y",
                                "name":"identifier"
                            },
                            "name":"b-child",
                            "class":"beta"
                        }
                    }
                ]
            };

            var patterns = ["!**/_attr","**/name"];

            var expected = {
                "name":"root",
                "link": [
                    {
                        "child": {
                            "name":"a-child",
                        }
                    },
                    {
                        "child": {
                            "name":"b-child",
                        }
                    }
                ]
            };

            var result = objglob.filter(patterns, input);

            expect(result).to.deep.equal(expected);
        });

    });

}); 
