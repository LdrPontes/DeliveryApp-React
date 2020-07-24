export abstract class UseCase<T, Params>{
    
    abstract buildUseCase(params: Params): Promise<T>
    
    execute(params: Params): Promise<T>{
        return this.buildUseCase(params)
    }

}