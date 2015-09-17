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

    });
}); 
