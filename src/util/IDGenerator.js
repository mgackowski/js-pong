const IDGenerator = {

    current: 0,

    createNewID() {
        this.current++;
        return this.current;
    }

}

export default IDGenerator;