(function (Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This extension must run unsandboxed');
    }

    // Variables to store spawn point coordinates
    let spawnX = 0;
    let spawnY = 0;

    class SomeMotion {
        setSpawnPoint() {
            spawnX = 0;
            spawnY = 0;
        }

        setSpawnPointToXY(args) {
            spawnX = Number(args.X);
            spawnY = Number(args.Y);
        }

        setSpawnPointToSprite(args) {
            const sprite = Scratch.vm.runtime.getSpriteTargetByName(args.SPRITE);
            if (sprite) {
                spawnX = sprite.x;
                spawnY = sprite.y;
            }
        }

        hopAtY(args, util) {
            if (util && util.target) {
                const originalY = util.target.y;
                const hopHeight = Number(args.YOFFSET);

                // Move to the target height
                util.target.y = originalY + hopHeight;

                // After a short delay, return to the original height
                setTimeout(() => {
                    util.target.y = originalY;
                }, 200); // Adjust the timeout duration for the hop effect
            }
        }

        getSpawnPointPosition() {
            return [spawnX, spawnY];
        }

        respawn(args, util) {
            if (util && util.target) {
                util.target.x = spawnX;
                util.target.y = spawnY;
            }
        }

        isTouchingSpawnPoint(args, util) {
            if (util && util.target) {
                return util.target.x === spawnX && util.target.y === spawnY;
            }
            return false;
        }

        isSpawnPointAtXY(args) {
            return spawnX === Number(args.X) && spawnY === Number(args.Y);
        }

        getInfo() {
            return {
                id: 'someMotion',
                name: 'Some Motion',
                color1: '#4C97FF', // Blue color for the extension
                blocks: [
                    {
                        opcode: 'setSpawnPoint',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Set Spawn Point',
                        func: 'setSpawnPoint'
                    },
                    {
                        opcode: 'setSpawnPointToXY',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Set Spawn Point to x: [X] y: [Y]',
                        arguments: {
                            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                        },
                        func: 'setSpawnPointToXY'
                    },
                    {
                        opcode: 'setSpawnPointToSprite',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Set Spawn Point to [SPRITE]',
                        arguments: {
                            SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: 'Sprite1' }
                        },
                        func: 'setSpawnPointToSprite'
                    },
                    {
                        opcode: 'hopAtY',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Hop at y: [YOFFSET]',
                        arguments: {
                            YOFFSET: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 }
                        },
                        func: 'hopAtY'
                    },
                    {
                        opcode: 'getSpawnPointPosition',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Get Spawn Point Position',
                        func: 'getSpawnPointPosition'
                    },
                    {
                        opcode: 'respawn',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Respawn',
                        func: 'respawn'
                    },
                    {
                        opcode: 'isTouchingSpawnPoint',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is touching spawn point?',
                        func: 'isTouchingSpawnPoint'
                    },
                    {
                        opcode: 'isSpawnPointAtXY',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is spawn point at x: [X] y: [Y]?',
                        arguments: {
                            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                        },
                        func: 'isSpawnPointAtXY'
                    }
                ]
            };
        }
    }

    Scratch.extensions.register(new SomeMotion());
})(Scratch);
