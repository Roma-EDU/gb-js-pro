Vue.component('server-error', {
    props: ['errorDetails'],
    template: `
        <div>
            <p> При запросе к серверу произошла ошибка {{ errorDetails }} </p>
        </div>
    `
});