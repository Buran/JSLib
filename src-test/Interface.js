InterfaceTest = TestCase('InterfaceTest');

InterfaceTest.prototype = {
	'test Null Interface': function() {
		var func = function() {
			//code goes here
		}.interface(null);

		assertNoException(func.stub(null));
	},
	'test Undefined Interface': function() {
		var undef;
		var func = function() {
			//code goes here
		}.interface(undefined);

		assertNoException(func.stub(undef));
		assertNoException(func.stub());
	},
	'test RegExp interface': function() {
		var func = function() {
			//code goes here
		}.interface(RegExp);

		assertNoException(func.stub(new RegExp('/foo/')));
		assertNoException(func.stub(/foo/));
	},
	'test Function interface': function() {
		var func = function() {
			//code goes here
		}.interface(Function);

		assertNoException(func.stub(Object));
		assertNoException(func.stub(function() {}));
	},
	'test Array interface': function() {
		var func = function() {
			//code goes here
		}.interface(Array, Array);

		var func2 = function() {
			//code goes here
		}.interface(Object, Object);

		assertNoException(func.stub([], new Array()));
		assertException(func2.stub([], new Array()));
	},
	testWrongArgumentTypeThrowsError: function() {
		var func = function() {
			//code goes here
		}.interface(Number, Boolean);

		assertException(func.stub(1, 2), 'TypeError');
		assertException(func.stub(1, undefined), 'TypeError');
	},
	testPrimitiveObjectPasses: function() {
		var func = function() {
			//code goes here
		}.interface(Number);

		assertNoException(func.stub(1));
		assertNoException(func.stub(Number(1)));
		assertNoException(func.stub(new Number(1)));
	},
	testObject: function() {
		var func = function() {
			//code goes here
		}.interface(Object);

		assertNoException(func.stub({}));
		assertNoException(func.stub(new Object()));
		assertNoException(func.stub(Object()));
		assertException(func.stub(Object), 'TypeError');
	},
	testNumberObjectThrowsErrorOnObjectInterface: function() {
		var func = function() {
			//code goes here
		}.interface(Object);

		assertException(func.stub(new Number(1)), 'TypeError');
	},
	testInheritedClassFromNumberMatchesNumber: function() {
		var func = function() {
			//code goes here
		}.interface(Number);

		var cls = function() {};
		cls.prototype = new Number();
		cls.prototype.constructor = cls;

		assertNoException(func.stub(new cls()));
	},
	testNumberDoesNotMatchInheritedClassFromNumber: function() {
		var cls = function() {};
		cls.prototype = new Number();
		cls.prototype.constructor = cls;

		var func = function() {
			//code goes here
		}.interface(cls);

		assertNoException(func.stub(new cls()));
		assertException(func.stub(1), 'TypeError');
	},
	testArgumentMultipleTypes: function() {
		var func = function() {
			//code goes here
		}.interface([Number, Object]);

		assertNoException(func.stub(1));
		assertNoException(func.stub(new Number(1)));
		assertNoException(func.stub({}));
		assertException(func.stub(new Boolean()), 'TypeError');
	},
	testArgumentMultipleInterfaces: function() {
		var func = function() {
			//code goes here
		}.interface(Number).interface(Boolean, Number);

		assertNoException(func.stub(1));
		assertNoException(func.stub(true, 1));
		assertException(func.stub('1'), 'TypeError');
	},
	'test passing RegExp object do not match Object Interface': function() {
		var func = function() {
			//code goes here
		}.interface(RegExp);

		assertException(func.stub(Object), 'TypeError');
	},
	'test passing NaN and Infinity as Number': function() {
		var func = function() {
			//code goes here
		}.interface(Number);

		assertNoException(func.stub(NaN));
		assertNoException(func.stub(Infinity));
	},
	'test Interfaced function save its context': function() {
		var obj = {
			a: function(a) {
				return this.b;
			}.interface(Number),
			b: 1
		};
		assertEquals(obj.a(2), 1);
	}
};
