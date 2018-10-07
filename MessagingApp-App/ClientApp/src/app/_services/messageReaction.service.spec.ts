import { TestBed, inject } from "@angular/core/testing";
import { MessageReactionService } from "./messageReaction.service";

describe("MessageReactionService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageReactionService]
    });
  });

  it("should be created", inject([MessageReactionService], (service: MessageReactionService) => {
    expect(service).toBeTruthy();
  }));
});
