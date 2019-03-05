function getCombBySum(array,sum,tolerance,targetCount){
  /*
  array： 数据源数组，必选；
  sum： 相加的和，必选；
  tolerance： 容差，如果不指定此参数，则相加的和必须等于sum参数，指定此参数可以使结果在容差范围内浮动，可选；
  targetCount： 操作数数量，如果不指定此参数，则结果包含所有可能的情况，指定此参数可以筛选出固定数量的数相加，假如指定为3，那么结果只包含三个数相加的情况，可选；
  返回值： 返回的是数组套数组结构，内层数组中的元素是操作数，外层数组中的元素是所有可能的结果；
  */
  var util = {
    /*
      get combination from array
      arr: target array
      num: combination item length
      return: one array that contain combination arrays
    */
    /*获取所有的可能组合
    如果是[1,2,3,4,5]取出3个，那么可能性就有10种 C(5,3)= C(5,2)
    公式： 
    全排列  P(n,m)=n!/(n-m)!
    组合排列 P(n,m)=n!/m!/(n-m)!
    C(5,2)=5!/2!*3!=5*4*3*2*1/[(2*1)*(3*2*1)]=10
    这是使用了循环加递归做出了组合排序
    */
    getCombination: function(arr, num) {  //  索引数组 操作数数量
      var r=[];
      (function f(t,a,n){
          if (n == 0) return r.push(t);
          for (var i=0,l=a.length; i<=l-n; i++) {
              f(t.concat(a[i]), a.slice(i+1), n-1);
        }
      })([],arr,num);
      return r;
    },
    // 获取数组的索引
    getArrayIndex: function(array) {
      var i = 0,
        r = [];
      for(i = 0;i<array.length;i++){
        r.push(i);
      }
      
      return r;
    }
  },logic = {
    //  对数组进行排序
    //  获取数组中比sum小的数
    init: function(array,sum) {  //初始化去除不可能的元素
      // clone array
      var _array = array.concat(),
      r = [],
      i = 0;
      // sort by asc
      _array.sort(function(a,b){
        return a - b;
      });
      // 当它小于或等于总和时获得所有数字
      for(i = 0;i<_array.length;i++){
        if(_array[i]<=sum){
          r.push(_array[i]);
        }else{
          break;
        }
      }
      console.log('初始化后的数据源:', r);
      return r;
    },
    // important function
    core: function(array,sum,arrayIndex,count,r){
      var i = 0,
        k = 0,
        combArray = [],
        _sum = 0,
        _cca = [],
        _cache = [];
      
      if(count == _returnMark){
        return;
      }
      // 获取当前的计数总和
      // 这里排序的不是原来的数组,而是求的索引后的数组
      combArray = util.getCombination(arrayIndex,count);
      console.log('getCombination返回的值：', combArray);
      for(i = 0;i<combArray.length;i++){
        _cca = combArray[i];
        _sum = 0;
        _cache = [];
        // calculate the sum from combination
        for(k = 0;k<_cca.length;k++){
          _sum += array[_cca[k]];
          _cache.push(array[_cca[k]]);
        }
        if(Math.abs(_sum-sum) <= _tolerance){
          r.push(_cache);
        }      
      }

      logic.core(array,sum,arrayIndex,count-1,r);
    }
  },
    r = [],
    _array = [],
    _targetCount = 0,
    _tolerance = 0,
    _returnMark = 0;
    
    // check data
  _targetCount = targetCount || _targetCount;
  _tolerance = tolerance || _tolerance;
  
  _array = logic.init(array,sum);
  if(_targetCount){
      _returnMark = _targetCount-1;
  }
  console.log('_targetCount的值:', _targetCount);
  console.log('_returnMark的值:', _returnMark);

  logic.core(_array,sum,util.getArrayIndex(_array),(_targetCount || _array.length),r);

  return r;
}
var res1 = getCombBySum([1, 2, 3, 4, 5], 6, null, 2);
// var res2 = getCombBySum([1, 2, 3, 4, 5, 9, 7, 10, 8], 9, null, null);
console.log(res1);
// console.log(res2);