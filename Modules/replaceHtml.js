
module.exports = function (template,product){
    let output = template.replace('{{%IMAGE%}}',product.image);
    output = output.replace('{{%NAME%}}',product.name)
    output = output.replace('{{%MODELNAME%}}',product.modelname)
    output = output.replace('{{%MODELNUMBER%}}',product.modelnumber)
    output = output.replace('{{%PRICE%}}',product.price)
    output = output.replace('{{%COLOR%}}',product.color)
    output = output.replace('{{%ID%}}',product.id)

    return output
}