package hello.itemservice.web.basic;

import hello.itemservice.domain.item.Item;
import hello.itemservice.domain.item.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.annotation.PostConstruct;
import java.util.List;

@Controller
@RequestMapping("/basic/items")
@RequiredArgsConstructor //Lombok에서 지원하는 생성자 기능
public class BasicItemController {
    private final ItemRepository itemRepository;

    @GetMapping
    public String items(Model model) {
        List<Item> items = itemRepository.findAll();
        model.addAttribute("items", items);

        return "basic/items";
    }

    @GetMapping("/{itemId}")
    public String item(@PathVariable long itemId, Model model) {
        Item item = itemRepository.findById(itemId);
        model.addAttribute("item", item);
        return "basic/item";
    }

    @GetMapping("/add")
    public String addForm() {
        return "basic/addForm";
    }

    //@PostMapping("/add")
    public String addItemV1(@RequestParam String itemName,
                       @RequestParam int price,
                       @RequestParam Integer quantity,
                       Model model) {
        Item item = new Item();
        item.setItemName(itemName);
        item.setPrice(price);
        item.setQuantity(quantity);

        itemRepository.save(item);

        model.addAttribute("item", item);

        return "basic/item";
    }

    //@PostMapping("/add")
    public String addItemV2(@ModelAttribute("item") Item item, Model model) {
        itemRepository.save(item);

        //model.addAttribute("item", item); // 자동으로 추가됨, 생략 가능함

        return "basic/item";
    }

    //@PostMapping("/add")
    public String addItemV3 (@ModelAttribute Item item, Model model) { //class 명의 첫번째 문자를 소문자로 바꿔서 modelAttribute에 넣어줌.
        itemRepository.save(item);
        return "basic/item";
    }
    //@PostMapping("/add")
    public String addItemV4 (Item item) { //class 명의 첫번째 문자를 소문자로 바꿔서 modelAttribute에 넣어줌.
        itemRepository.save(item);
        return "basic/item";
    } //코드를 최대한으로 줄일 수 있다.

    //@PostMapping("/add") //PRG - Post > Redirect > Get
    public String addItemV5 (Item item) { //class 명의 첫번째 문자를 소문자로 바꿔서 modelAttribute에 넣어줌.
        itemRepository.save(item);
        return "redirect:/basic/items/" + item.getId();
    } //코드를 최대한으로 줄일 수 있다.

    @PostMapping("/add")
    public String addItemV6 (Item item, RedirectAttributes redirectAttributes) { // 저장된 화면이라는 것을 사용자에게 알림
        Item savedItem = itemRepository.save(item);
        redirectAttributes.addAttribute("itemId", savedItem.getId());
        redirectAttributes.addAttribute("status", true);
        return "redirect:/basic/items/{itemId}";
    } //코드를 최대한으로 줄일 수 있다.

    @GetMapping("/{itemId}/edit")
    public String editForm(@PathVariable Long itemId, Model model){
        Item item = itemRepository.findById(itemId);
        model.addAttribute("item", item);
        return "basic/editForm";
    }

    @PostMapping("/{itemId}/edit")
    public String edit(@PathVariable Long itemId, @ModelAttribute Item item){
        itemRepository.update(itemId, item);
        return "redirect:/basic/items/{itemId}";
    }


    /*
    * 테스트용 데이터 추가
    * */
    @PostConstruct
    public void init() {
        itemRepository.save(new Item("itemA", 10000, 10));
        itemRepository.save(new Item("itemB", 20000, 20));
    }
}
