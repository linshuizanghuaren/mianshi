var example=[1,4,3,8,9,6,2]
		
function quickSort(arr){
	if(arr.length<=1){
		return arr;
	}
    var left=[],right=[],current=arr.splice(0,1);
    console.log(current)
	for(let i=0;i<arr.length;i++){
		if(arr[i]<current){
			left.push(arr[i])
		}else{
			right.push(arr[i])
        }
    }
    console.log(quickSort(left) + '===' + current,quickSort(right))
	return quickSort(left).concat(current,quickSort(right));
}
console.log(quickSort(example)); //[1, 2, 3, 4, 6, 8, 9]