let main_text="";
let operators=['+','-','.','×','÷','%']
let dot_flag=1
AC.addEventListener('click', () => {
    main_text="";
    text.textContent = `${main_text}`;
})
one.addEventListener('click', () => {
    main_text=main_text+"1";
    text.textContent = `${main_text}`;
})

two.addEventListener('click', () => {
    main_text=main_text+"2";
    text.textContent = `${main_text}`;
})

three.addEventListener('click', () => {
    main_text=main_text+"3";
    text.textContent = `${main_text}`;
})

four.addEventListener('click', () => {
    main_text=main_text+"4";
    text.textContent = `${main_text}`;
})

five.addEventListener('click', () => {
    main_text=main_text+"5";
    text.textContent = `${main_text}`;
})

six.addEventListener('click', () => {
    main_text=main_text+"6";
    text.textContent = `${main_text}`;
})

seven.addEventListener('click', () => {
    main_text=main_text+"7";
    text.textContent = `${main_text}`;
})

eight.addEventListener('click', () => {
    main_text=main_text+"8";
    text.textContent = `${main_text}`;
})

nine.addEventListener('click', () => {
    main_text=main_text+"9",
    text.textContent = `${main_text}`;
})

zero.addEventListener('click', () => {
    if(main_text==""){
        return;
    }
    if(operators.includes(main_text.slice(-1))) return
    main_text=main_text+"0";
    text.textContent = `${main_text}`;
})

zero_zero.addEventListener('click', () => {
    if(main_text==""){
        return;
    }
    if(operators.includes(main_text.slice(-1))) return
    main_text=main_text+"00";
    text.textContent = `${main_text}`;
})

dot.addEventListener('click', () => {
    if(operators.includes(main_text.slice(-1))) return;
    if(main_text==""){
        return;
    }
    else{
        if(dot_flag){
            main_text=main_text+".";
            text.textContent = `${main_text}`;
            dot_flag=0;
        }
        else{
            return
        }
        
    }
})

plus.addEventListener('click',() =>{
    if(main_text==""){
        return;
    }
    if(operators.includes(main_text.slice(-1))) return;
        main_text=main_text+'+';
        text.textContent=`${main_text}`
        dot_flag=1
    
})

minus.addEventListener('click',() =>{
    if(main_text=="") return;
    if(operators.includes(main_text.slice(-1))) return;
        main_text=main_text+'-';
        text.textContent=`${main_text}`
        dot_flag=1
    
})

umnogenie.addEventListener('click',() =>{
    if(main_text=="") return;
    if(operators.includes(main_text.slice(-1))) return;
        main_text=main_text+'×';
        text.textContent=`${main_text}`
        dot_flag=1
    
})

delenie.addEventListener('click',() =>{
    if(main_text=="") return;
    if(operators.includes(main_text.slice(-1))) return;
        main_text=main_text+'÷';
        text.textContent=`${main_text}`
        dot_flag=1
    
})

procent.addEventListener('click',() =>{
    if(main_text=="") return;
    if(operators.includes(main_text.slice(-1))) return;
        main_text=main_text+'%';
        text.textContent=`${main_text}`
        dot_flag=1
    
})

function calculate(main_text) {
    // Заменяем символы на JavaScript операторы
    let expression = main_text
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\./g, '.')
        .replace(/\s+/g, '');

    if (!expression) return 0;

    try {
        // Приоритет операторов
        const precedence = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
            '%': 2  // % имеет такой же приоритет как умножение/деление
        };

        // Преобразуем в обратную польскую нотацию (RPN)
        function toRPN(expr) {
            let output = [];
            let operators = [];
            
            // Разбиваем на токены (числа и операторы)
            let tokens = expr.split(/([+\-*/%])/).filter(token => token !== '');
            
            for (let token of tokens) {
                if (!isNaN(token) && token !== '') {
                    // Число
                    output.push(parseFloat(token));
                } else if (token in precedence) {
                    // Оператор
                    while (operators.length > 0 && 
                           precedence[operators[operators.length - 1]] >= precedence[token]) {
                        output.push(operators.pop());
                    }
                    operators.push(token);
                }
            }
            
            // Добавляем оставшиеся операторы
            while (operators.length > 0) {
                output.push(operators.pop());
            }
            
            return output;
        }

        // Вычисляем RPN выражение
        function evaluateRPN(rpn) {
            let stack = [];
            
            for (let token of rpn) {
                if (typeof token === 'number') {
                    stack.push(token);
                } else {
                    let b = stack.pop();
                    let a = stack.pop();
                    
                    switch (token) {
                        case '+':
                            stack.push(a + b);
                            break;
                        case '-':
                            stack.push(a - b);
                            break;
                        case '*':
                            stack.push(a * b);
                            break;
                        case '/':
                            if (b === 0) throw new Error('Деление на ноль');
                            stack.push(a / b);
                            break;
                        case '%':
                            if (b === 0) throw new Error('Остаток от деления на ноль');
                            stack.push(a % b);
                            break;
                    }
                }
            }
            
            return stack[0];
        }

        let rpn = toRPN(expression);
        return evaluateRPN(rpn);

    } catch (error) {
        console.error('Ошибка вычисления:', error);
        return NaN;
    }
}

ravno.addEventListener('click',() =>{
    
        let result = calculate(main_text);
        if (isNaN(result)) {
            text.textContent = 'Ошибка';
        } else {
            text.textContent = result;
        }
        main_text=String(result);
})