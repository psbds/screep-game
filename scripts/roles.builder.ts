/// <reference path="./screeps.d.ts" />
import { Roles } from "./enums.roles";
import Role from "./roles_";

class Builder extends Role {
    public roleName: string = Roles.BUILDER;

    run(creep: Creep) {
        var memoRoom = creep.room.memory;
        memoRoom[`${creep.pos.x}=${creep.pos.y}`] = memoRoom[`${creep.pos.x}=${creep.pos.y}`] ? memoRoom[`${creep.pos.x}=${creep.pos.y}`] + 1 : 1;

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }



        if (creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else if(false){
                var repairs = creep.room.find(FIND_STRUCTURES).filter(x => x.hits < x.hitsMax);

                if (creep.repair(repairs[0]) == ERR_NOT_IN_RANGE) {
                    console.log("rep");
                    creep.moveTo(repairs[0], { visualizePathStyle: { stroke: '#ffffff' } })
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
}

export default new Builder();