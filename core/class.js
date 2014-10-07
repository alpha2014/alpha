/*
 * Class
 * function:
 * 1. define class
 * 2. extend base class
 *
 * TODO:
 * 1. multi extend - mix
 */

(function(){
	function Base(){}

	Base.prototype = {
		callBase : function(){
			var method = arguments.callee.caller,
				name,
				found = false,
				baseMethod;

			var proto = this.__proto__;
			while( proto ){

				if(!found){
					for(var i in proto){
						if( proto[i] === method ){
							found = true;
							name = i;
							break;
						}
					}
				}else{
					for(var i in proto){
						if( i == name ){
							baseMethod = proto[i];
							break;
						}
					}
				}

				if( baseMethod ) break;

				proto = proto.__proto__;
			}

			baseMethod.apply( this, ([]).slice.call( arguments, 0 ) );
		}
	}

	function extend( base, sub ){
		var Tmp = function(){};
		Tmp.prototype = base.prototype;
		sub.prototype = new Tmp();
	}

	function createClass( name, attrs ){
		var F;
		eval( 'F = function ' + name + '(){var args = ([]).slice.call(arguments, 0);this.construct.apply(this, args);}' );
		
		// 所有类继承基类，若有集成关系，则不需继承基类
		if( attrs.extend ){
			extend( attrs.extend, F );
		}else{// 没有继承关系，默认继承基类
			extend( Base, F );
		}

		// 指定构造函数执行前后的方法, 一个简单的钩子程序 
		if(attrs.__before || attrs.__after){
			var _construct = attrs.construct;
			attrs.construct = function(){
				var args = ([]).slice.call(arguments, 0);
				attrs.__before && attrs.__before.call(this);
				_construct.apply(this, args);
				attrs.__after && attrs.__after.call(this);
			}
		}

		F.prototype = Alpha.Utils.mix( F.prototype, attrs );

		return F;
	}

	Alpha.createClass = createClass;

})();