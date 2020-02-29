class Roles {
    protected roleName: string;

    getNumberOfCreeps(creeps: { [creepName: string]: Creep }): number {
        var count = 0;
        for (var creepName in creeps) {
            var creep = creeps[creepName];
            if (creep.memory.role == this.roleName) {
                count++;
            }
        }
        return count;
    }
}
export default Roles;