/// <reference path="./screeps.d.ts" />

class Spawner {
    protected createCreep(parent: StructureSpawn, name: string, atributtes: BodyPartConstant[], opts?: SpawnOptions) {
        parent.spawnCreep(atributtes, name, opts);
    }
}

export default Spawner;